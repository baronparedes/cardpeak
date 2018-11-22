using CardPeak.Domain.Metrics;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Domain
{
	public sealed class TeamDashboard
	{
		public Team Team { get; set; }
		public decimal TotalApprovals { get; set; }
		public IEnumerable<ApprovalMetric<int>> AvailableYears { get; set; }
		public IEnumerable<ApprovalMetric<string>> Performance { get; set; }
		public IEnumerable<TeamDashboardDetail> Details { get; set; }
		public int MemberCount
		{
			get
			{
				if (this.Details == null)
				{
					return 0;
				}
				return this.Details.ToList().Count();
			}
		}
	}
}
