using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IApprovalTransactionRepository : IRepository<ApprovalTransaction>
    {
        IEnumerable<ApprovalTransaction> FindByClient(string clientName);
        IEnumerable<ApprovalTransaction> FindByBatch(int batchId);
        bool Exists(ApprovalTransaction transaction);
        bool Delete(int id);
    }
}
