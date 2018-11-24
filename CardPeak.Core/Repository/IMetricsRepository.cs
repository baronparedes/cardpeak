using CardPeak.Domain.Metrics;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
	public interface IMetricsRepository
	{
		IEnumerable<AgentApprovalMetric> GetApprovalsByAgent(int year, int month);
		IEnumerable<AgentRankMetric> GetAgentRankMetrics(int year, int month, int bankId);
		IEnumerable<AgentPerformanceMetric> GetAgentPerformanceMetrics(int year);
		IEnumerable<AgentThresholdMetric> GetAgentThresholdMetrics(int year, int month);
		IEnumerable<AgentDisbursementMetrics> GetAgentDisbursementMetrics(DateTime targetDate);
		IEnumerable<BankAmountDistribution> GetBankAmountDistribution(int year, int month);

	}
}
