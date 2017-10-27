using System.Collections.Generic;

namespace CardPeak.Domain.Metrics
{
    public sealed class AgentTresholdMetric : ApprovalMetric<Agent>
    {
        public int Rank { get; set; }
        public IEnumerable<ApprovalMetric<string>> ApprovalsByBank { get; set; }
    }
}
