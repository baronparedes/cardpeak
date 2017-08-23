﻿using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF
{
    public sealed class ApprovalTransactionRepository : Repository<ApprovalTransaction, CardPeakDbContext>, IApprovalTransactionRepository
    {
        public ApprovalTransactionRepository(CardPeakDbContext context) : base(context)
        {
        }

        public decimal AccountBalanceByAgent(int id)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == id)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .First();
        }

        public decimal ApprovalsByAgent(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ApprovalTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context.ApprovalTransactions.Where(_ => _.AgentId == id);
            if (endDate.HasValue)
            {
                result.Where(_ => _.ApprovalDate >= startDate.Date && _.ApprovalDate <= endDate.GetValueOrDefault().Date);
            }
            else
            {
                result.Where(_ => _.ApprovalDate >= startDate.Date);
            }

            return result.ToList();
        }
    }
}
