using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
	public sealed class DefaultRateRepository : RepositoryBase<DefaultRate, CardPeakDbContext>, IDefaultRateRepository
	{
		public DefaultRateRepository(CardPeakDbContext context) : base(context)
		{
		}

		public Rate GetRate(int typeId, int cardCategoryId, int bankId)
		{
			var rate = this.Context.DefaultRates
				.Where(_ => _.BankId == bankId)
				.Where(_ => _.CardCategoryId == cardCategoryId)
				.Where(_ => _.TypeId == typeId)
				.Select(_ => new Rate
				{
					RateId = _.DefaultRateId,
					AgentId = 0,
					CardCategoryId = _.CardCategoryId,
					BankId = _.BankId,
					Amount = _.Amount,
					SavingsAmount = _.SavingsAmount,
					IsDefault = true,
					TypeId = _.TypeId
				})
				.FirstOrDefault();
			return rate;
		}

		public IEnumerable<Rate> GetRates(int typeId)
		{
			return this.Context.DefaultRates
				.Include(_ => _.Bank)
				.Include(_ => _.CardCategory)
				.Where(_ => _.TypeId == typeId)
				.OrderBy(_ => _.Bank.Description)
				.ThenBy(_ => _.CardCategory.Description)
				.AsNoTracking()
				.ToList()
				.Select(_ => new Rate
				{
					RateId = _.DefaultRateId,
					AgentId = 0,
					CardCategoryId = _.CardCategoryId,
					BankId = _.BankId,
					Amount = _.Amount,
					SavingsAmount = _.SavingsAmount,
					IsDefault = true,
					TypeId = _.TypeId,
					Bank = _.Bank,
					CardCategory = _.CardCategory
				});
		}

		public void SaveRates(int typeId, Settings settings)
		{
			var rates = this.Context.DefaultRates.Where(_ => _.TypeId == typeId).ToList();
			rates.ForEach(_ =>
			{
				var item = settings.Rates.FirstOrDefault(rate => rate.BankId == _.BankId && rate.CardCategoryId == _.CardCategoryId);
				if (item != null)
				{
					_.Amount = item.Amount;
					_.SavingsAmount = item.SavingsAmount;
					this.Context.Entry(_).State = EntityState.Modified;
				}
				else
				{
					this.Context.Entry(_).State = EntityState.Deleted;
				}
			});

			var newRates = settings.Rates.ToList();
			newRates.ForEach(_ =>
			{
				var item = rates.FirstOrDefault(rate => rate.BankId == _.BankId && rate.CardCategoryId == _.CardCategoryId);
				if (item == null)
				{
					_.Bank = null;
					_.CardCategory = null;
					this.Context.Entry(_).State = EntityState.Added;
					this.Context.Rates.Add(_);
				}
			});
		}
	}
}
