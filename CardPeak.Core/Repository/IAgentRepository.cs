using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Repository
{
    public interface IAgentRepository : IRepository<Agent>
    {
        IEnumerable<Agent> GetAllOrderedByName();
        Agent Update(Agent agent, List<Account> accounts);
    }
}
