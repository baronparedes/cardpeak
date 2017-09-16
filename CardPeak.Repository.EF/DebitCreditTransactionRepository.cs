using CardPeak.Core.Repository;
using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

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

        public decimal GetAccountBalanceByAgent(int id)
        {
            return this.GetBalanceByAgent(id, (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction);
        }

        public decimal GetSavingsBalanceByAgent(int id)
        {
            return this.GetBalanceByAgent(id, (int)CardPeak.Domain.Enums.TransactionTypeEnum.SavingsTransaction);
        }

        public IEnumerable<DebitCreditTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context
                .DebitCreditTransactions
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
                .Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) >= startDate.Date);

            if (endDate != null && startDate.Date <= endDate.Value.Date)
            {
                result = result.Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) <= DbFunctions.TruncateTime(endDate.Value));
            }

            return result.ToList();
        }

        public decimal GetAccountBalance(int year, int month)
        {
            return this.Context.DebitCreditTransactions
                .Where(_ => _.TransactionDateTime.Year == year && _.TransactionDateTime.Month == month)
                .Where(_ => _.TransactionTypeId == (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction && !_.IsDeleted)
                .Sum(_ => _.Amount);
        }
    }
}
