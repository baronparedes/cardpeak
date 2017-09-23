using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IDebitCreditTransactionRepository : IRepository<DebitCreditTransaction>
    {
        IEnumerable<DebitCreditTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate);
        decimal GetAgentAccountBalance(int agentId);
        decimal GetAgentSavingsBalance(int agentId);
        decimal GetAccountBalance(int year, int month);
        decimal GetSavingsBalance(int year, int month);
    }
}
