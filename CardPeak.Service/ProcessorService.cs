using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System.Collections.Generic;

namespace CardPeak.Service
{
    public sealed class ProcessorService : UnitOfWork, IProcessorService
    {
        private IAccountRepository AccountRepository;
        private IReferenceRepository ReferenceRepository;
        private IRateRepository RateRepository;
        private IApprovalTransactionRepository ApprovalTransactionRepository;

        public ProcessorService(CardPeakDbContext context) : base(context)
        {
            this.AccountRepository = new AccountRepository(context);
            this.ReferenceRepository = new ReferenceRepository(context);
            this.RateRepository = new RateRepository(context);
            this.ApprovalTransactionRepository = new ApprovalTransactionRepository(context);
        }

        public Rate GetRate(int agentId, int cardCategoryId, int bankId)
        {
            return this.RateRepository.GetRate(agentId, cardCategoryId, bankId);
        }

        public IEnumerable<Account> GetAgentsByAlias(string alias)
        {
            return this.AccountRepository.FindByAlias(alias);
        }

        public Reference GetCardCategoryByCode(string code)
        {
            return this.ReferenceRepository.GetCardCategoryByShortDescription(code);
        }

        public bool TransactionHasDuplicates(ApprovalTransaction transaction)
        {
            return this.ApprovalTransactionRepository.Exists(transaction);
        }
    }
}