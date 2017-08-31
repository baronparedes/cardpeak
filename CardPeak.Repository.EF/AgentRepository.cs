using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class AgentRepository : Repository<Agent, CardPeakDbContext>, IAgentRepository
    {
        public AgentRepository(CardPeakDbContext context) : base(context)
        {
        }

        public IEnumerable<Agent> GetAllOrderedByName()
        {
            return this.Context.Agents
                .Where(_ => !_.IsDeleted)
                .OrderBy(_ => _.FirstName).ThenBy(_ => _.LastName).ToList();
        }
    }
}
