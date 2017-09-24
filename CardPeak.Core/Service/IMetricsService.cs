using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IMetricsService : IUnitOfWork
    {
        IEnumerable<AgentApprovalMetric> GetAgentApprovalMetrics(int? year, int? month);
    }
}
