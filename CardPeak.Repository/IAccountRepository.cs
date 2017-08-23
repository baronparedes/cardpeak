﻿using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository
{
    public interface IAccountRepository : IRepository<Account>
    {
        IEnumerable<Account> FindByAgent(int id);
    }
}
