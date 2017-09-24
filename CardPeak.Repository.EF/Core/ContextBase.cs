using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF.Core
{
    public abstract class ContextBase<TDbContext>
        where TDbContext : DbContext

    {
        protected readonly TDbContext Context;

        public ContextBase(TDbContext context)
        {
            this.Context = context;
        }
    }
}
