using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Domain
{
	public sealed class AgentPayoutTransaction
	{
		public int Count
		{
			get
			{
				if (this.Payouts == null)
				{
					return 0;
				}

				return this.Payouts.Count();
			}
		}
		public IEnumerable<Metrics.ApprovalMetric<Agent>> Payouts { get; set; }
	}
}
