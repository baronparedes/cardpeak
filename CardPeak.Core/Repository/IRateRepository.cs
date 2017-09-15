using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Repository
{
    public interface IRateRepository : IRepository<Rate>
    {
        IEnumerable<Rate> GetRates(int agentId);
        Rate GetRate(int agentId, int cardCategoryId, int bankId);
        void SaveRates(int agentId, Settings settings);
    }
}
