using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IAgentRepository : IRepository<Agent>
    {
        IEnumerable<Agent> GetAllOrderedByName();
        Agent Update(Agent agent, List<Account> accounts);
        AgentPayout GetAgentPayouts();
        void DeactivateAgent(int agentId);
    }
}
