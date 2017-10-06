using CardPeak.Domain;
using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IDashboardService : IUnitOfWork
    {
        Dashboard GetDashboard(int? year = null, int? month = null);
        IEnumerable<ApprovalMetric<int>> GetAvailableYears();
    }
}
