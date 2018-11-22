using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Domain
{
	public sealed class TeamDashboardDetail
	{
		public TeamPlacement TeamPlacement { get; set; }
		public IEnumerable<ApprovalMetric<string>> Performance { get; set; }
	}
}
