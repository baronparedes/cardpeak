using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class AccountRepository : Repository<Account, CardPeakDbContext>, IAccountRepository
    {
        public AccountRepository(CardPeakDbContext context) : base(context)
        {
        }

        public IEnumerable<Account> FindByAgent(int id)
        {
            return this.Find(_ => _.AgentId == id).ToList();
        }
    }
}
