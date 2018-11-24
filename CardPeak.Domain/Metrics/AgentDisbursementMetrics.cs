namespace CardPeak.Domain.Metrics
{
	public sealed class AgentDisbursementMetrics : ApprovalMetric<Agent>
	{
		public decimal Disbursement { get; set; }
	}
}