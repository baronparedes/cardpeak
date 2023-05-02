using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IRateRepository : IRepository<Rate>
    {
        IEnumerable<Rate> GetAgentRates(int agentId);
        Rate GetAgentRate(int agentId, int cardCategoryId, int bankId, Reference agentType);
        void SaveAgentRates(int agentId, Settings settings);
    }
}
