using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain.Metrics
{
    public sealed class AgentPerformanceMetric : ApprovalMetric<Agent>
    {
        public int Rank { get; set; }
        public IEnumerable<ApprovalMetric<string>> Performance { get; set; }
    }
}