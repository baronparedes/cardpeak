using System.Data.Entity;

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
