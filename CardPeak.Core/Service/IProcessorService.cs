using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IProcessorService : IUnitOfWork
    {
        IEnumerable<Account> GetAgentsByAlias(string alias);
        Reference GetCardCategoryByCode(string code);
        decimal ComputeAmountAllocation(int agentId, int agentCount, int cardCategoryId, int bankId);
        void ComputeTransactionAmount(int agentCount, ref ProcessedApprovalTransaction item);
    }
}
