using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IProcessorService : IUnitOfWork
    {
        IEnumerable<Account> GetAgentsByAlias(string alias);
        Reference GetCardCategoryByCode(string code);
        decimal ComputeAmountAllocation(int agentId, decimal units, int cardCategoryId, int bankId);
    }
}
