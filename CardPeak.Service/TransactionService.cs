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

        public IEnumerable<ApprovalTransaction> GetTransactions(string clientName)
        {
            return this.ApprovalTransactionRepository.FindByClient(clientName);
        }
    }
}
