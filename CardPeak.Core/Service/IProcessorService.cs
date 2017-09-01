using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Service
{
    public interface IProcessorService : IUnitOfWork
    {
        IEnumerable<Account> GetAgentsByAlias(string alias);
        Reference GetCardCategoryByCode(string code);
        decimal ComputeAmountAllocation(int agentId, decimal units, int cardCategoryId, int bankId);
    }
}
