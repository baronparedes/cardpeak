using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IDebitCreditTransactionRepository : IRepository<DebitCreditTransaction>
    {
        IEnumerable<DebitCreditTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate);
        decimal GetAccountBalanceByAgent(int id);
        decimal GetSavingsBalanceByAgent(int id);
        decimal GetAccountBalance(int year, int month);
    }
}
