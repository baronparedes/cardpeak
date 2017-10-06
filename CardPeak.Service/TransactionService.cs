using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System.Collections.Generic;

namespace CardPeak.Service
{
    public sealed class TransactionService : UnitOfWork, ITransactionService
    {
        private IApprovalTransactionRepository ApprovalTransactionRepository;

        public TransactionService(CardPeakDbContext context) 
            : base(context)
        {
            this.ApprovalTransactionRepository = new ApprovalTransactionRepository(context);
        }

        public IEnumerable<ApprovalTransaction> GetTransactionsByClient(string clientName)
        {
            var result = this.ApprovalTransactionRepository.FindByClient(clientName);
            return result;
        }

        public IEnumerable<ApprovalTransaction> GetTransactionsByBatch(int batchId)
        {
            var result = this.ApprovalTransactionRepository.FindByBatch(batchId);
            return result;
        }

        public bool DeleteTransaction(int id)
        {
            var result = this.ApprovalTransactionRepository.Delete(id);
            if (result)
            {
                this.Complete();
            }
            return result;
        }
    }
}