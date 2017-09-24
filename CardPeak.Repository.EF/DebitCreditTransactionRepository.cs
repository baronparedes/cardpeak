using CardPeak.Core.Repository;
using CardPeak.Domain;
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

        private decimal GetBalanceByAgent(int agentId, int type)
        {
            return this.Context.DebitCreditTransactions
                .Where(_ => _.TransactionTypeId == type && _.AgentId == agentId && !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal GetAgentAccountBalance(int agentId)
        {
            return this.GetBalanceByAgent(agentId, (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction);
        }

        public decimal GetAgentSavingsBalance(int agentId)
        {
            return this.GetBalanceByAgent(agentId, (int)CardPeak.Domain.Enums.TransactionTypeEnum.SavingsTransaction);
        }

        public IEnumerable<DebitCreditTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context
                .DebitCreditTransactions
                .Where(_ => _.AgentId == agentId && !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
                .Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) >= startDate.Date);

            if (endDate != null && startDate.Date <= endDate.Value.Date)
            {
                result = result.Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) <= DbFunctions.TruncateTime(endDate.Value));
            }

            return result.ToList();
        }

        private decimal QueryBalance(int year, int month, Domain.Enums.TransactionTypeEnum transactionType)
        {
            var query = this.Context.DebitCreditTransactions
                .Where(_ => _.TransactionDateTime.Year == year)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)transactionType);

            if (month != 0)
            {
                query = query.Where(_ => _.TransactionDateTime.Month == month);
            }

            return query.Select(_ => _.Amount)
                .DefaultIfEmpty(0)
                .Sum();
        }

        public decimal GetAccountBalance(int year, int month)
        {
            return this.QueryBalance(year, month, Domain.Enums.TransactionTypeEnum.DebitCreditTransaction);
        }

        public decimal GetSavingsBalance(int year, int month)
        {
            return this.QueryBalance(year, month, Domain.Enums.TransactionTypeEnum.SavingsTransaction);
        }
    }
}
