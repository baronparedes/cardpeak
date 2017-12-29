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

        private decimal GetBalanceByAgent(int agentId, int type, DateTime? endDate = null)
        {
            var result = this.Context.DebitCreditTransactions
                .Where(_ => _.AgentId == agentId)
                .Where(_ => !_.Agent.IsDeleted)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == type);

            if (endDate.HasValue)
            {
                result = result.Where(_ => DbFunctions.TruncateTime(_.TransactionDateTime) < DbFunctions.TruncateTime(endDate.Value));
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

            return result
                .OrderByDescending(_ => _.Id)
                .AsNoTracking()
                .ToList();
        }

        private decimal QueryBalance(int year, int month, Domain.Enums.TransactionTypeEnum transactionType)
        {
            var query = this.Context.DebitCreditTransactions
                .Where(_ => _.TransactionDateTime.Year == year)
                .Where(_ => !_.IsDeleted)
                .Where(_ => !_.Agent.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)transactionType);

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
    }
}
