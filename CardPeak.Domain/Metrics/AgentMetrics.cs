using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Domain.Metrics
{
    public sealed class AgentMetrics
    {
        public IEnumerable<AgentApprovalMetric> AgentApprovalMetrics { get; set; }

        public decimal TotalApproved
        {
            get
            {
                if (this.AgentApprovalMetrics != null)
                {
                    return this.AgentApprovalMetrics.Sum(_ => _.Value);
                }
                return 0;
            }
        }

        public decimal TotalBalance
        {
            get
            {
                if (this.AgentApprovalMetrics != null)
                {
                    return this.AgentApprovalMetrics.Sum(_ => _.AccountBalance);
                }
                return 0;
            }
        }

        public decimal TotalSavings
        {
            get
            {
                if (this.AgentApprovalMetrics != null)
                {
                    return this.AgentApprovalMetrics.Sum(_ => _.SavingsBalance);
                }
                return 0;
            }
        }
    }
}
