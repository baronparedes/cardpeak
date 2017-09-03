using CardPeak.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using CardPeak.Core.Repository;

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
        }

        public decimal ComputeAmountAllocation(int agentId, decimal units, int cardCategoryId, int bankId)
        {
            // TODO: Compute by Rates
            return 0;
        }

        public IEnumerable<Account> GetAgentsByAlias(string alias)
        {
            return this.AccountRepository.FindByAlias(alias);
        }

        public Reference GetCardCategoryByCode(string code)
        {
            var description = "";
            code = code.ToUpper();
            switch (code)
            {
                case "C":
                    description = "Classic";
                    break;
                case "G":
                    description = "Gold";
                    break;
                case "P":
                    description = "Platinum";
                    break;
                default:
                    return null;
            }

            return this.ReferenceRepository.GetCardCategoryByDescription(description);
        }
    }
}
