using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IDebitCreditTransactionRepository : IRepository<DebitCreditTransaction>
    {
        IEnumerable<DebitCreditTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate);
        decimal AccountBalanceByAgent(int id);
        decimal SavingsBalanceByAgent(int id);
    }
}
