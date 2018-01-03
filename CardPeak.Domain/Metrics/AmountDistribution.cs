using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain.Metrics
{
    public sealed class AmountDistribution
    {
        public string Description { get; set; }
        public IEnumerable<ApprovalMetric<decimal>> ApprovalsByAmount { get; set; }
        public decimal TotalApproved
        {
            get
            {
                var result = this.ApprovalsByAmount?.Sum(_ => _.Value);
                return result.GetValueOrDefault();
            }
        }
    }
}
