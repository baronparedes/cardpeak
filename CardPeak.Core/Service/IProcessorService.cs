using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IProcessorService : IUnitOfWork
    {
        IEnumerable<Account> GetAgentsByAlias(string alias);
        Reference GetCardCategoryByCode(string code);
        Rate GetRate(int agentId, int cardCategoryId, int bankId);
        bool TransactionHasDuplicates(ApprovalTransaction transaction);
    }
}
