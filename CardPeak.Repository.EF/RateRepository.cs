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

        public Rate GetDefaultAgentRate(int agentId, int cardCategoryId, int bankId, Reference agentType)
        {
            if (agentType != null)
            {
                var defaultAgentTypeRate = this.Context.References
                    .Where(_ => _.ShortDescription.ToLower() == agentType.ShortDescription.ToLower())
                    .Where(_ => _.ReferenceTypeId == (int)CardPeak.Domain.Enums.ReferenceTypeEnum.DefaultRate)
                    .FirstOrDefault();

                if (defaultAgentTypeRate != null)
                {
                    return this.Context.DefaultRates
                        .Where(_ => _.TypeId == defaultAgentTypeRate.ReferenceId)
                        .Where(_ => _.BankId == bankId)
                        .Where(_ => _.CardCategoryId == cardCategoryId)
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
            }

            return this.Context.DefaultRates
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


        public Rate GetAgentRate(int agentId, int cardCategoryId, int bankId, Reference agentType)
        {
            var agentRate = this.Context.Rates
                .Where(_ => _.BankId == bankId)
                .Where(_ => _.CardCategoryId == cardCategoryId)
                .Where(_ => _.AgentId == agentId)
                .FirstOrDefault();

            if (agentRate == null)
            {
                return this.GetDefaultAgentRate(agentId, cardCategoryId, bankId, agentType);
            }

            return agentRate;
        }

        public IEnumerable<Rate> GetAgentRates(int agentId)
        {
            return this.Context.Rates
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => _.AgentId == agentId)
                .OrderBy(_ => _.Bank.Description)
                .ThenBy(_ => _.CardCategory.Description)
                .ToList();
        }

        public void SaveAgentRates(int agentId, Settings settings)
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
