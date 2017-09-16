using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface ITransactionService : IUnitOfWork
    {
        IEnumerable<ApprovalTransaction> GetTransactions(string clientName);
    }
}
