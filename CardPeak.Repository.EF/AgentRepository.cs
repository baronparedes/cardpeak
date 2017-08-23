using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF
{
    public sealed class AgentRepository : Repository<Agent, CardPeakDbContext>, IAgentRepository
    {
        public AgentRepository(CardPeakDbContext context) : base(context)
        {
        }

        public IEnumerable<Agent> GetAllOrderedByName()
        {
            return this.Context.Agents.OrderBy(_ => _.FirstName).ThenBy(_ => _.LastName).ToList();
        }
    }
}
