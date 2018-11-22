using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Domain
{
	public sealed class TeamDashboard
	{
		public Team Team { get; set; }
		public decimal TotalApprovals { get; set; }
		public IEnumerable<ApprovalMetric<int>> AvailableYears { get; set; }
		public IEnumerable<ApprovalMetric<string>> TeamPerformance { get; set; }
		public IEnumerable<TeamDashboardDetail> Details { get; set; }
	}
}
