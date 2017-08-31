﻿using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Linq.Expressions;

namespace CardPeak.Repository.EF
{
    public sealed class ApprovalTransactionRepository : Repository<ApprovalTransaction, CardPeakDbContext>, IApprovalTransactionRepository
    {
        public ApprovalTransactionRepository(CardPeakDbContext context) : base(context)
        {
        }

        public override IEnumerable<ApprovalTransaction> Find(Expression<Func<ApprovalTransaction, bool>> predicate)
        {
            return this.Context.Set<ApprovalTransaction>()
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(predicate);
        }

        public decimal AccountBalanceByAgent(int id)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal TotalApprovalsByAgent(int id)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .Select(_ => _.Units)
                .DefaultIfEmpty(0)
                .Sum();
        }

        public IEnumerable<ApprovalPerformance> GetAgentPerformance(int id)
        {
            return this.Context.GetAgentPerformance(id)
                .Select(_ => new ApprovalPerformance
                {
                    Month = _.MonthName,
                    Units = _.Units.GetValueOrDefault()
                })
                .ToList();
        }

        public IEnumerable<ApprovalTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context
                .ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) >= startDate.Date);

            endDate = endDate ?? DateTime.Today;
            if (startDate.Date <= endDate.Value.Date)
            {
                result = result
                    .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) <= endDate.Value.Date);
            }

            result = result
                .OrderBy(_ => _.ApprovalDate)
                .ThenBy(_ => _.Client);

            return result.ToList();
        }

        public IEnumerable<ApprovalTransaction> FindByClient(string client)
        {
            var result = this.Context.ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => _.Client.ToLower().Contains(client.ToLower()))
                .OrderBy(_ => _.Client);
            return result.ToList();
        }
    }
}
