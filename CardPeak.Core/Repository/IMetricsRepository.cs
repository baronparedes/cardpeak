using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IMetricsRepository
    {
        IEnumerable<AgentApprovalMetric> GetApprovalsByAgent(int year, int month);
        IEnumerable<AgentRankMetric> GetAgentRankMetrics(int year, int month);
        IEnumerable<AgentPerformanceMetric> GetAgentPerformanceMetrics(int year);
        IEnumerable<BankAmountDistribution> GetBankAmountDistribution(int year, int month);
        IEnumerable<AgentThresholdMetric> GetAgentThresholdMetrics(int year, int month);
    }
}
