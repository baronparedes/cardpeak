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
                var result = this.AgentApprovalMetrics?.Sum(_ => _.Value);
                return result.GetValueOrDefault();
            }
        }

        public decimal TotalBalance
        {
            get
            {
                var result = this.AgentApprovalMetrics?.Sum(_ => _.AccountBalance);
                return result.GetValueOrDefault();
            }
        }

        public decimal TotalSavings
        {
            get
            {
                var result = this.AgentApprovalMetrics?.Sum(_ => _.SavingsBalance);
                return result.GetValueOrDefault();
            }
        }

        public decimal TotalIncentives
        {
            get
            {
                var result = this.AgentApprovalMetrics?.Sum(_ => _.IncentivesBalance);
                return result.GetValueOrDefault();
            }
        }
    }
}
