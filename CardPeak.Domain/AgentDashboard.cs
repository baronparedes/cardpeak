using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Domain
{
    public sealed class AgentDashboard
    {
        public Agent Agent { get; set; }
        public decimal AccountBalance { get; set; }
        public decimal SavingsBalance { get; set; }
        public decimal IncentivesBalance { get; set; }
        public decimal TotalApprovals { get; set; }
        public IEnumerable<Account> Accounts { get; set; }
        public IEnumerable<AgentDashboardTransaction> AgentDashboardTransactions { get; set; }
        public IEnumerable<ApprovalTransaction> ApprovalTransactions { get; set; }
        public IEnumerable<DebitCreditTransaction> DebitCreditTransactions { get; set; }
        public IEnumerable<DebitCreditTransaction> IncentiveTransactions { get; set; }
        public IEnumerable<ApprovalMetric<string>> Performance { get; set; }
        public IEnumerable<ApprovalMetric<string>> ApprovalsByBank { get; set; }
        public IEnumerable<ApprovalMetric<string>> ApprovalsByCategory { get; set; }
        public IEnumerable<ApprovalMetric<int>> AvailableYears { get; set; }
        public IDictionary<string, IEnumerable<ApprovalMetric<string>>> ApprovalsByBankDetails { get; set; }
    }
}
