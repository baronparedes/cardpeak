using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IMetricsService : IUnitOfWork
    {
        AgentMetrics GetAgentApprovalMetrics(int? year, int? month);
    }
}
