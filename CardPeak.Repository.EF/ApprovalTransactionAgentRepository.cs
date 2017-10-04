﻿using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class ApprovalTransactionAgentRepository : ApprovalTransactionRepository, IApprovalTransactionAgentRepository
    {
        public ApprovalTransactionAgentRepository(CardPeakDbContext context) : base(context)
        {
        }

        private IQueryable<ApprovalTransaction> QueryByAgentAndDateRange(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context
                .ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => _.AgentId == agentId)
                .Where(_ => !_.IsDeleted)
                .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) >= startDate.Date);

            if (endDate != null && startDate.Date <= endDate.Value.Date)
            {
                result = result
                    .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) <= DbFunctions.TruncateTime(endDate.Value));
            }

            return result;
        }

        public IEnumerable<ApprovalTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.QueryByAgentAndDateRange(agentId, startDate, endDate);
            result = result
                .OrderBy(_ => _.ApprovalDate)
                .ThenBy(_ => _.Client);

            return result.ToList();
        }

        public decimal GetAgentAccountBalance(int agentId)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == agentId && !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal GetAgentTotalApprovals(int agentId, DateTime startDate, DateTime? endDate)
        {
            return this.QueryByAgentAndDateRange(agentId, startDate, endDate)
                .Select(_ => _.Units)
                .DefaultIfEmpty(0)
                .Sum();
        }

        public IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int agentId)
        {
            var months = 6;
            var previousMonthsExcludingCurrentMonth = (months - 1) * -1;
            var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(previousMonthsExcludingCurrentMonth);
            var endDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(1).AddDays(-1);
            var result = new Dictionary<string, decimal>();
            for (int i = previousMonthsExcludingCurrentMonth; i < 1; i++)
            {
                result.Add(DateTime.Now.AddMonths(i).ToString(Configurations.MonthFormat), 0);
            }

            var query = this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == agentId)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.ApprovalDate >= startDate && _.ApprovalDate <= endDate)
                .GroupBy(_ => _.ApprovalDate.Month)
                .Select(_ => new
                {
                    Month = _.FirstOrDefault().ApprovalDate.Month,
                    Approvals = _.Sum(approvals => approvals.Units)
                })
                .ToList();

            query.ForEach(_ => {
                result[new DateTime(DateTime.Now.Year, _.Month, 1).ToString(Configurations.MonthFormat)] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByBank(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank)
                .ToDictionary(_ => _.Description, _ => 0m);

            var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
                .GroupBy(_ => _.BankId)
                .Select(_ => new { Bank = _.FirstOrDefault().Bank.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            query.ForEach(_ => {
                result[_.Bank] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByCategory(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory)
                .ToDictionary(_ => _.Description, _ => 0m);

            var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
                .GroupBy(_ => _.BankId)
                .Select(_ => new { CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            query.ForEach(_ => {
                result[_.CardCategory] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetAgentApprovalsByBankDetails(int agentId, DateTime startDate, DateTime? endDate)
        {
            var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank).ToList();
            var categories = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory).ToList();

            var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
                .GroupBy(_ => new { _.BankId, _.CardCategoryId })
                .Select(_ => new { BankId = _.FirstOrDefault().Bank.ReferenceId, CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            var result = new Dictionary<string, IEnumerable<ApprovalMetric<string>>>();

            foreach (var item in banks)
            {
                var metrics = categories.ToDictionary(_ => _.Description, _ => 0m);
                query.Where(_ => _.BankId == item.ReferenceId)
                    .ToList()
                    .ForEach(_ => {
                        metrics[_.CardCategory] = _.Approvals;
                    });

                result.Add(item.Description, metrics.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value }));
            }

            return result;
        }
    }
}
