﻿using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class AccountRepository : RepositoryBase<Account, CardPeakDbContext>, IAccountRepository
    {
        public AccountRepository(CardPeakDbContext context) : base(context)
        {
        }

        public IEnumerable<Account> FindByAgent(int id)
        {
            return this.Context.Accounts
                .Include(_ => _.Agent)
                .Where(_ => _.AgentId == id)
                .Where(_ => !_.Agent.IsDeleted)
                .AsNoTracking()
                .ToList();
        }

        public IEnumerable<Account> FindByAlias(string alias)
        {
            return this.Context.Accounts
                .Include(_ => _.Agent)
                .Include(_ => _.Agent.AgentType)
                .Where(_ => _.Alias.ToLower() == alias.ToLower())
                .Where(_ => !_.Agent.IsDeleted)
                .AsNoTracking()
                .ToList();
        }
    }
}
