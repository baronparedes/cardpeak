using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Linq.Expressions;
using System.Data.Entity;

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

        public IEnumerable<Account> FindByAlias(string alias)
        {
            return this.Context.Accounts
                .Include(_ => _.Agent)
                .Where(_ => _.Alias.ToLower() == alias.ToLower())
                .ToList();
        }
    }
}
