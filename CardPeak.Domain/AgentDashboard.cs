using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class AgentDashboard
    {
        public Agent Agent { get; set; }
        public decimal AccountBalance { get; set; }
        public decimal SavingsBalance { get; set; }
        public int TotalApprovals { get; set; }

        public IEnumerable<Account> Accounts { get; set; }
        public IEnumerable<ApprovalTransaction> ApprovalTransactions { get; set; }
        public IEnumerable<DebitCreditTransaction> DebitCreditTransactions { get; set; }
        public IEnumerable<MonthlyApproval> Performance { get; set; }
    }
}
