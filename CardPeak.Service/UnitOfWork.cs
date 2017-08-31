using CardPeak.Core.Service;
using CardPeak.Repository.EF;

namespace CardPeak.Service
{
    public abstract class UnitOfWork : IUnitOfWork
    {
        protected readonly CardPeakDbContext DomainContext;

        public UnitOfWork(CardPeakDbContext context)
        {
            this.DomainContext = context;
        }

        public int Complete()
        {
            return this.DomainContext.SaveChanges();
        }

        public virtual void Dispose()
        {
            this.DomainContext.Dispose();
        }
    }
}
