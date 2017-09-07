using CardPeak.Core.Repository;
using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF
{
    public sealed class BatchFileConfigurationRepository : Repository<BatchFileConfiguration, CardPeakDbContext>, IBatchFileConfigurationRepository
    {
        public BatchFileConfigurationRepository(CardPeakDbContext context) : base(context)
        {
        }

        public BatchFileConfiguration FindByBankId(int bankId)
        {
            return this.Context.BatchFileConfiguration.SingleOrDefault(_ => _.BankId == bankId);
        }
    }
}
