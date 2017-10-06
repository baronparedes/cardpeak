using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class AgentPayout
    {
        public int Count
        {
            get
            {
                if (this.Payouts == null)
                {
                    return 0;
                }

                return this.Payouts.Count();
            }
        }
        public IEnumerable<Metrics.ApprovalMetric<Agent>> Payouts { get; set; }
    }
}
