using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain.Metrics
{
    public sealed class BankAmountBreakdown
    {
        public string Description { get; set; }
        public IEnumerable<AmountBreakdown> CardCategoryAmountBreakdown { get; set; }
        public decimal TotalApproved
        {
            get
            {
                var result = this.CardCategoryAmountBreakdown?
                    .Sum(_ => _.ApprovalsByAmount?.Sum(t => t.Value));
                return result.GetValueOrDefault();
            }
        }
    }
}
