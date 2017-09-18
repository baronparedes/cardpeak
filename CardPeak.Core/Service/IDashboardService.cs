using CardPeak.Domain;

namespace CardPeak.Core.Service
{
    public interface IDashboardService : IUnitOfWork
    {
        Dashboard GetDashboard(int? year = null, int? month = null);
    }
}
