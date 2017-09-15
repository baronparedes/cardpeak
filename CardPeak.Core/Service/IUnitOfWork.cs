using System;

namespace CardPeak.Core.Service
{
    public interface IUnitOfWork : IDisposable
    {
        int Complete();
    }
}
