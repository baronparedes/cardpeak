namespace CardPeak.Domain.Metrics
{
    public sealed class AgentApprovalMetric : ApprovalMetric<Agent>
    {
        public decimal AccountBalance { get; set; }
        public decimal SavingsBalance { get; set; }
    }
}
