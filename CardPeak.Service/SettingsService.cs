using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Service
{
    public sealed class SettingsService : UnitOfWork, ISettingsService
    {
        private IReferenceRepository ReferenceRepository;
        private IRateRepository RateRepository;

        public SettingsService(CardPeakDbContext context) 
            : base(context)
        {
            this.ReferenceRepository = new ReferenceRepository(context);
            this.RateRepository = new RateRepository(context);
        }

        public Settings GetRates(int agentId = 0)
        {
            return new Settings
            {
                Rates = this.RateRepository.GetRates(agentId),
                Banks = this.ReferenceRepository.GetBanks(),
                CardCategories = this.ReferenceRepository.GetCardCategories()
            };
        }

        public Settings GetSettings()
        {
            return new Settings
            {
                Banks = this.ReferenceRepository.GetBanks(),
                CardCategories = this.ReferenceRepository.GetCardCategories(),
                BankReferenceTypeId = (int)CardPeak.Domain.Enums.ReferenceTypeEnum.Bank,
                CardCategoryReferenceTypeId = (int)CardPeak.Domain.Enums.ReferenceTypeEnum.CardCategory
            };
        }

        public IEnumerable<Rate> SaveRates(int agentId, Settings settings)
        {
            this.RateRepository.SaveRates(agentId, settings);
            this.Complete();
            return this.RateRepository.GetRates(agentId);
        }
    }
}
