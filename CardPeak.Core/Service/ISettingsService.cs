using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Service
{
    public interface ISettingsService : IUnitOfWork
    {
        Settings GetSettings();
        Settings GetRates(int agentId);
        IEnumerable<Rate> SaveRates(int agentId, Settings settings);
    }
}
  