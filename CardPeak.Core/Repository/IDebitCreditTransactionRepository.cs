using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IDebitCreditTransactionRepository : IRepository<DebitCreditTransaction>
    {
        IEnumerable<DebitCreditTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate, Domain.Enums.TransactionTypeEnum transactionType);
        decimal GetAgentAccountBalance(int agentId, DateTime? endDate = null, Domain.Enums.TransactionTypeEnum transactionType = Domain.Enums.TransactionTypeEnum.DebitCreditTransaction);
        decimal GetAccountBalance(int year, int month, Domain.Enums.TransactionTypeEnum transactionType = Domain.Enums.TransactionTypeEnum.DebitCreditTransaction);
    }
}
