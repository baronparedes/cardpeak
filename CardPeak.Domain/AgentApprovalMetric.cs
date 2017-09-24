namespace CardPeak.Domain
{
    public sealed class AgentApprovalMetric : ApprovalMetric<Agent>
    {
        public decimal AccountBalance { get; set; }
        public decimal SavingsBalance { get; set; }
    }
}
