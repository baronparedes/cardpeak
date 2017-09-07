using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Repository
{
    public interface IBatchFileConfigurationRepository : IRepository<BatchFileConfiguration>
    {
        BatchFileConfiguration FindByBankId(int bankId);
    }
}
