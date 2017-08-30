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

        public Settings GetSettings(int agentId = 0)
        {
            return new Settings
            {
                Rates = this.RateRepository.GetRates(agentId),
                Banks = this.ReferenceRepository.GetBanks(),
                CardCategories = this.ReferenceRepository.GetCardCategories()
            };
        }

        public void SaveRates(int agentId, Settings settings)
        {
            var rates = settings.Rates.ToList();
            rates.ForEach(_ => {
                this.DomainContext.Entry(_.Bank).State = EntityState.Unchanged;
                this.DomainContext.Entry(_.CardCategory).State = EntityState.Unchanged;
            });
            this.DomainContext.Rates.RemoveRange(this.DomainContext.Rates.Where(_ => _.AgentId == agentId));
            this.DomainContext.Rates.AddRange(rates);
            this.DomainContext.SaveChanges();
        }

    }
}
