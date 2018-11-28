using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
	public sealed class RateRepository : RepositoryBase<Rate, CardPeakDbContext>, IRateRepository
	{
		public RateRepository(CardPeakDbContext context) : base(context)
		{
		}

		public Rate GetRate(int agentId, int cardCategoryId, int bankId)
		{
			var rate = this.Context.Rates
				.Where(_ => _.BankId == bankId)
				.Where(_ => _.CardCategoryId == cardCategoryId)
				.Where(_ => _.AgentId == agentId)
				.OrderByDescending(_ => _.AgentId)
				.FirstOrDefault();

			if (rate == null)
			{
				rate = this.Context.DefaultRates
					.Where(_ => _.BankId == bankId)
					.Where(_ => _.CardCategoryId == cardCategoryId)
					.OrderByDescending(_ => _.TypeId)
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
						TypeId = _.TypeId
					})
					.FirstOrDefault();
			}

			return rate;
		}

		public IEnumerable<Rate> GetRates(int agentId)
		{
			return this.Context.Rates
				.Include(_ => _.Bank)
				.Include(_ => _.CardCategory)
				.Where(_ => _.AgentId == agentId)
				.OrderBy(_ => _.Bank.Description)
				.ThenBy(_ => _.CardCategory.Description)
				.ToList();
		}

		public void SaveRates(int agentId, Settings settings)
		{
			var rates = this.Context.Rates.Where(_ => _.AgentId == agentId).ToList();
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
