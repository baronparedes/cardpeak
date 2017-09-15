using CardPeak.Core.Service;
using CardPeak.Repository.EF;
using System;

namespace CardPeak.Service
{
    public abstract class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly CardPeakDbContext Context;

        public UnitOfWork(CardPeakDbContext context)
        {
            this.Context = context;
        }

        public int Complete()
        {
            return this.Context.SaveChanges();
        }

        public virtual void Dispose()
        {
            this.Context.Dispose();
        }
    }
}
