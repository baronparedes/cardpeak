using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;

namespace CardPeak.Service
{
    public sealed class ProcessorService : UnitOfWork, IProcessorService
    {
        private IAccountRepository AccountRepository;
        private IReferenceRepository ReferenceRepository;
        private IRateRepository RateRepository;

        public ProcessorService(CardPeakDbContext context) : base(context)
        {
            this.AccountRepository = new AccountRepository(context);
            this.ReferenceRepository = new ReferenceRepository(context);
            this.RateRepository = new RateRepository(context);
        }

        public decimal ComputeAmountAllocation(int agentId, int agentCount, int cardCategoryId, int bankId)
        {
            var rate = this.RateRepository.GetRate(agentId, cardCategoryId, bankId);
            if (rate == null)
            {
                throw new ArgumentNullException("Rate for this agent was not found.");
            }

            return rate.Amount / agentCount;
        }

        public IEnumerable<Account> GetAgentsByAlias(string alias)
        {
            return this.AccountRepository.FindByAlias(alias);
        }

        public Reference GetCardCategoryByCode(string code)
        {
            var codes = CardCategory.Codes;
            var description = codes[code.ToUpper()];
            return this.ReferenceRepository.GetCardCategoryByDescription(description);
        }
    }
}