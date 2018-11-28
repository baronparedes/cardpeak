using System.Collections.Generic;

namespace CardPeak.Domain.Metrics
{
	public sealed class AgentDisbursementMetrics : ApprovalMetric<Agent>
	{
		public decimal TotalDisbursed { get; set; }
		public IEnumerable<DebitCreditTransaction> Details { get; set; }
	}
}