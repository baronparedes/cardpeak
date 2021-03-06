﻿using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IAccountRepository : IRepository<Account>
    {
        IEnumerable<Account> FindByAgent(int agentId);
        IEnumerable<Account> FindByAlias(string alias);
    }
}
