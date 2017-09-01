using CardPeak.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using CardPeak.Repository.EF;

namespace CardPeak.Service
{
    public sealed class ProcessorService : UnitOfWork, IProcessorService
    {
        public ProcessorService(CardPeakDbContext context) : base(context)
        {
        }

        public decimal ComputeAmountAllocation(int agentId, decimal units, int cardCategoryId, int bankId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Account> GetAgentsByAlias(string alias)
        {
            throw new NotImplementedException();
        }

        public Reference GetCardCategoryByCode(string code)
        {
            throw new NotImplementedException();
        }
    }
}
