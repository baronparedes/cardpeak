﻿using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace CardPeak.Repository.EF
{
    public sealed class DebitCreditTransactionRepository : Repository<DebitCreditTransaction, CardPeakDbContext>, IDebitCreditTransactionRepository
    {
        public DebitCreditTransactionRepository(CardPeakDbContext context) : base(context)
        {
        }

        private decimal GetBalanceByAgent(int id, int type)
        {
            return this.Context.DebitCreditTransactions
                .Where(_ => _.TransactionTypeId == type && _.AgentId == id && !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal AccountBalanceByAgent(int id)
        {
            return this.GetBalanceByAgent(id, (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction);
        }

        public decimal SavingsBalanceByAgent(int id)
        {
            return this.GetBalanceByAgent(id, (int)CardPeak.Domain.Enums.TransactionTypeEnum.SavingsTransaction);
        }

        public IEnumerable<DebitCreditTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context
                .DebitCreditTransactions
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
                .Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) == startDate);

            endDate = endDate ?? DateTime.Today;
            if (startDate <= endDate.Value)
            {
                result = result.Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) <= endDate.Value);
            }

            return result.ToList();
        }
    }
}
