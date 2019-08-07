using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Domain.Metrics;
using CardPeak.Repository.EF.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class DebitCreditTransactionRepository : RepositoryBase<DebitCreditTransaction, CardPeakDbContext>, IDebitCreditTransactionRepository
    {
        public DebitCreditTransactionRepository(CardPeakDbContext context) : base(context)
        {
        }

        private decimal GetBalanceByAgent(int agentId, int type, DateTime? endDate = null)
        {
            var result = this.Context.DebitCreditTransactions
                .Where(_ => _.AgentId == agentId)
                .Where(_ => !_.Agent.IsDeleted)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == type);

            if (endDate.HasValue)
            {
                result = result.Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) <= DbFunctions.TruncateTime(endDate.Value));
            }

            return result
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal GetAgentAccountBalance(int agentId, DateTime? endDate = null, 
            Domain.Enums.TransactionTypeEnum transactionType = Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
        {
            return this.GetBalanceByAgent(agentId, (int)transactionType, endDate);
        }

        public IEnumerable<DebitCreditTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate, Domain.Enums.TransactionTypeEnum transactionType)
        {
            var result = this.Context.DebitCreditTransactions
                .Where(_ => _.AgentId == agentId)
                .Where(_ => !_.Agent.IsDeleted)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)transactionType)
                .Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) >= startDate.Date);


            if (endDate != null && startDate.Date <= endDate.Value.Date)
            {
                result = result.Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) <= DbFunctions.TruncateTime(endDate.Value));
            }

            if (transactionType == Domain.Enums.TransactionTypeEnum.SavingsTransaction)
            {
                result = result
                    .Where(_ => _.BatchId == null && _.TransactionId == null);
            }

            return result
                .OrderByDescending(_ => _.Id)
                .AsNoTracking()
                .ToList();
        }

        private decimal QueryBalance(int year, int month, Domain.Enums.TransactionTypeEnum transactionType)
        {
            var query = this.Context.DebitCreditTransactions
                .Where(_ => !_.IsDeleted)
                .Where(_ => !_.Agent.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)transactionType);

            if (year != 0)
            {
                query = query.Where(_ => _.TransactionDateTime.Year == year);
            }

            if (month != 0)
            {
                query = query.Where(_ => _.TransactionDateTime.Month == month);
            }

            return query.Select(_ => _.Amount)
                .DefaultIfEmpty(0)
                .Sum();
        }

        public decimal GetAccountBalance(int year, int month, Domain.Enums.TransactionTypeEnum transactionType = Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
        {
            return this.QueryBalance(year, month, transactionType);
        }

        public IEnumerable<ApprovalMetric<string>> GetSavingsByYear(int agentId)
        {
            var query = this.Context.DebitCreditTransactions
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.AgentId == agentId)
                .Where(_ => _.TransactionTypeId == (int)Domain.Enums.TransactionTypeEnum.SavingsTransaction)
                .GroupBy(_ => _.TransactionDateTime.Year)
                .Select(_ => new
                {
                    _.FirstOrDefault().TransactionDateTime.Year,
                    Amount = _.Sum(approvals => approvals.Amount)
                })
                .ToList();

            return query.Select(_ => new ApprovalMetric<string>
            {
                Key = _.Year.ToString(),
                Value = _.Amount,
                Amount = _.Amount
            });
        }

        public IEnumerable<ApprovalMetric<string>> GetSavingsByMonth(int agentId, int? year = null)
        {
            year = year ?? DateTime.Now.Year;

            var startDate = new DateTime(year.Value, 1, 1);
            var endDate = new DateTime(year.Value, 12, 31);
            var result = new Dictionary<string, decimal?>();

            for (int i = 1; i <= 12; i++)
            {
                result.Add(new DateTime(year.Value, i, 1).ToString(Configurations.MonthFormat), null);
            }

            var query = this.Context.DebitCreditTransactions
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionDateTime >= startDate && _.TransactionDateTime <= endDate)
                .Where(_ => _.AgentId == agentId)
                .Where(_ => _.TransactionTypeId == (int)Domain.Enums.TransactionTypeEnum.SavingsTransaction)
                .GroupBy(_ => _.TransactionDateTime.Month)
                .Select(_ => new
                {
                    _.FirstOrDefault().TransactionDateTime.Month,
                    Amount = _.Sum(approvals => approvals.Amount)
                })
                .ToList();

            query.ForEach(_ =>
            {
                result[new DateTime(year.Value, _.Month, 1).ToString(Configurations.MonthFormat)] = _.Amount;
            });

            return result.Select(_ => new ApprovalMetric<string>
            {
                Key = _.Key,
                Amount = _.Value ?? 0
            });
        }
    }
}
