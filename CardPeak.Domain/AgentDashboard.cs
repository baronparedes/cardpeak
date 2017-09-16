﻿using System.Collections.Generic;

namespace CardPeak.Domain
{
    public sealed class AgentDashboard
    {
        public Agent Agent { get; set; }
        public decimal AccountBalance { get; set; }
        public decimal SavingsBalance { get; set; }
        public decimal TotalApprovals { get; set; }
        public IEnumerable<Account> Accounts { get; set; }
        public IEnumerable<ApprovalTransaction> ApprovalTransactions { get; set; }
        public IEnumerable<DebitCreditTransaction> DebitCreditTransactions { get; set; }
        public IEnumerable<Metric> Performance { get; set; }
    }
}
