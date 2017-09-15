using CardPeak.Domain;

namespace CardPeak.Core.Service
{
    public interface IDashboardService : IUnitOfWork
    {
        Dashboard GetDashboard();
    }
}
