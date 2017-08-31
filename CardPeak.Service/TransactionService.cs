using CardPeak.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using CardPeak.Repository;
using CardPeak.Repository.EF;

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
