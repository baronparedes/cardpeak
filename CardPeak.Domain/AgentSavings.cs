using CardPeak.Domain.Metrics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class AgentSavings
    {
        public Agent Agent { get; set; }
        public decimal SavingsBalance { get; set; }
        public IEnumerable<ApprovalMetric<string>> SavingsByMonth { get; set; }
        public IEnumerable<ApprovalMetric<string>> SavingsByYear { get; set; }
        public IEnumerable<DebitCreditTransaction> SavingsTransactions{ get; set; }
    }
}
