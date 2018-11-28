using CardPeak.Domain;
using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
	public interface IApprovalTransactionDashboardRepository : IApprovalTransactionRepository
	{
		decimal GetAccountBalance(int year, int month);
		decimal GetTotalApprovals(int year, int month);
		IEnumerable<ApprovalMetric<string>> GetApprovalsByBank(int year, int month);
		IEnumerable<ApprovalMetric<string>> GetApprovalsByCategory(int year, int month);
		IEnumerable<ApprovalMetric<string>> GetYearlyPerformance(int year);
		IEnumerable<ApprovalMetric<Agent>> GetTopAgents(int year, int month);
		IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetApprovalsByBankDetails(int year, int month);
		IEnumerable<ApprovalMetric<int>> GetAvailableYears();
		IEnumerable<ApprovalMetric<int>> GetAvailableYearsByTeam(int teamId);
	}
}
