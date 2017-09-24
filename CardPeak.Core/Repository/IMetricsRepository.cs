using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IMetricsRepository
    {
        IEnumerable<AgentApprovalMetric> ApprovalsByAgent(int year, int month);
    }
}
