using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
