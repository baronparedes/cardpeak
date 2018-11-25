using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System.Collections.Generic;

namespace CardPeak.Service
{
	public sealed class SettingsService : UnitOfWork, ISettingsService
	{
		private IReferenceRepository ReferenceRepository;
		private IRateRepository RateRepository;
		private IDefaultRateRepository DefaultRateRepository;

		public SettingsService(CardPeakDbContext context)
			: base(context)
		{
			this.ReferenceRepository = new ReferenceRepository(context);
			this.RateRepository = new RateRepository(context);
			this.DefaultRateRepository = new DefaultRateRepository(context);
		}

		public Settings GetSettings()
		{
			return new Settings
			{
				Banks = this.ReferenceRepository.GetBanks(),
				CardCategories = this.ReferenceRepository.GetCardCategories(),
				DefaultRateTypes = this.ReferenceRepository.GetDefaultRateTypes(),
				BankReferenceTypeId = (int)CardPeak.Domain.Enums.ReferenceTypeEnum.Bank,
				CardCategoryReferenceTypeId = (int)CardPeak.Domain.Enums.ReferenceTypeEnum.CardCategory,
				DefaultRateReferenceTypeId = (int)CardPeak.Domain.Enums.ReferenceTypeEnum.DefaultRate
			};
		}

		public Settings GetDefaultRates(int typeId)
		{
			return new Settings
			{
				Rates = this.DefaultRateRepository.GetRates(typeId),
				Banks = this.ReferenceRepository.GetBanks(),
				CardCategories = this.ReferenceRepository.GetCardCategories(),
				DefaultRateTypes = this.ReferenceRepository.GetDefaultRateTypes()
			};
		}

		public Settings GetRates(int agentId = 0)
		{
			return new Settings
			{
				Rates = this.RateRepository.GetRates(agentId),
				Banks = this.ReferenceRepository.GetBanks(),
				CardCategories = this.ReferenceRepository.GetCardCategories(),
				DefaultRateTypes = this.ReferenceRepository.GetDefaultRateTypes()
			};
		}

		public IEnumerable<Rate> SaveDefaultRates(int typeId, Settings settings)
		{
			this.DefaultRateRepository.SaveRates(typeId, settings);
			this.Complete();
			return this.DefaultRateRepository.GetRates(typeId);
		}

		public IEnumerable<Rate> SaveRates(int agentId, Settings settings)
		{
			this.RateRepository.SaveRates(agentId, settings);
			this.Complete();
			return this.RateRepository.GetRates(agentId);
		}
	}
}
