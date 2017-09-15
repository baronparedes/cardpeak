using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface ITransactionService : IUnitOfWork
    {
        IEnumerable<CardPeak.Domain.ApprovalTransaction> GetTransactions(string clientName);
    }
}
