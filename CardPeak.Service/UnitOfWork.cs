using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
