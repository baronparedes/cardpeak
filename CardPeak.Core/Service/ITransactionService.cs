using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface ITransactionService : IUnitOfWork
    {
        IEnumerable<ApprovalTransaction> GetTransactionsByClient(string clientName);
        IEnumerable<ApprovalTransaction> GetTransactionsByBatch(int batchId);
        bool DeleteTransaction(int id);
    }
}
