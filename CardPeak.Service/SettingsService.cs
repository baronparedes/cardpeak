using CardPeak.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using CardPeak.Repository;
using CardPeak.Repository.EF;
using System.Data.Entity;

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
            var rates = this.DomainContext.Rates.Where(_ => _.AgentId == agentId).ToList();
            rates.ForEach(_ => {
                var item = settings.Rates.FirstOrDefault(rate => rate.BankId == _.BankId && rate.CardCategoryId == _.CardCategoryId);
                if (item != null)
                {
                    _.Amount = item.Amount;
                    this.DomainContext.Entry(_).State = EntityState.Modified;
                }
                else
                {
                    this.DomainContext.Entry(_).State = EntityState.Deleted;
                }
            });

            var newRates = settings.Rates.ToList();
            newRates.ForEach(_ => {
                var item = rates.FirstOrDefault(rate => rate.BankId == _.BankId && rate.CardCategoryId == _.CardCategoryId);
                if (item == null)
                {
                    _.Bank = null;
                    _.CardCategory = null;
                    this.DomainContext.Entry(_).State = EntityState.Added;
                    this.DomainContext.Rates.Add(_);
                }
            });

            this.DomainContext.SaveChanges();
            return this.RateRepository.GetRates(agentId);
        }

    }
}
