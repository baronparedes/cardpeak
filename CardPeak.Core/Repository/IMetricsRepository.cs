using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IMetricsRepository
    {
        IEnumerable<AgentApprovalMetric> GetApprovalsByAgent(int year, int month);
        IEnumerable<AgentRankMetric> GetAgentRankings(int year, int month);
        IEnumerable<AgentPerformanceMetric> GetAgentPerformanceMetrics(int year);
    }
}
