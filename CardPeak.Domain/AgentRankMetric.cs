using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class AgentRankMetric : ApprovalMetric<Agent>
    {
        public int Rank { get; set; }
        public IEnumerable<ApprovalMetric<string>> ApprovalsByBank { get; set; }
    }
}
