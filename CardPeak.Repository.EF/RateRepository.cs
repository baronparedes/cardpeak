using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class RateRepository : Repository<Rate, CardPeakDbContext>, IRateRepository
    {
        public RateRepository(CardPeakDbContext context) : base(context)
        {
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
    }
}
