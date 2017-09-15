using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IRateRepository : IRepository<Rate>
    {
        IEnumerable<Rate> GetRates(int agentId);
        Rate GetRate(int agentId, int cardCategoryId, int bankId);
        void SaveRates(int agentId, Settings settings);
    }
}
