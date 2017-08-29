using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

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
