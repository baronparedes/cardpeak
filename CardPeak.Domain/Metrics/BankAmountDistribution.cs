using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain.Metrics
{
    public sealed class BankAmountDistribution
    {
        public string Description { get; set; }
        public IEnumerable<AmountDistribution> CardCategoryAmountDistribution { get; set; }
        public decimal TotalApproved
        {
            get
            {
                var result = this.CardCategoryAmountDistribution?
                    .Sum(_ => _.ApprovalsByAmount?.Sum(t => t.Value));
                return result.GetValueOrDefault();
            }
        }
    }
}
