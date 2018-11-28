using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain.Metrics;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;

namespace CardPeak.Service
{
	public sealed class MetricsService : UnitOfWork, IMetricsService
	{
		private static readonly int DefaultYear = 0;
		private static readonly int DefaultMonth = 0;
		private IMetricsRepository MetricsRepository;

		public MetricsService(CardPeakDbContext context) : base(context)
		{
			this.MetricsRepository = new MetricsRepository(context);
		}

		public AgentMetrics GetAgentApprovalMetrics(int? year, int? month)
		{
			year = year ?? MetricsService.DefaultYear;
			month = month ?? MetricsService.DefaultMonth;
			return new AgentMetrics()
			{
				AgentApprovalMetrics = this.MetricsRepository.GetApprovalsByAgent(year.Value, month.Value)
			};
		}

		public IEnumerable<AgentDisbursementMetrics> GetAgentDisbursementMetrics(DateTime targetDate)
		{
			return this.MetricsRepository.GetAgentDisbursementMetrics(targetDate);
		}

		public IEnumerable<AgentPerformanceMetric> GetAgentPerformanceMetrics(int? year)
		{
			year = year ?? MetricsService.DefaultYear;
			return this.MetricsRepository.GetAgentPerformanceMetrics(year.Value);
		}

		public IEnumerable<AgentRankMetric> GetAgentRankMetrics(int? year, int? month, int? bankId)
		{
			year = year ?? MetricsService.DefaultYear;
			month = month ?? MetricsService.DefaultMonth;
			bankId = bankId ?? 0;
			return this.MetricsRepository.GetAgentRankMetrics(year.Value, month.Value, bankId.Value);
		}

		public IEnumerable<AgentThresholdMetric> GetAgentThresholdMetrics(int? year, int? month)
		{
			year = year ?? MetricsService.DefaultYear;
			month = month ?? MetricsService.DefaultMonth;
			return this.MetricsRepository.GetAgentThresholdMetrics(year.Value, month.Value);
		}

		public IEnumerable<BankAmountDistribution> GetBankAmountDistributionMetrics(int? year, int? month)
		{
			year = year ?? MetricsService.DefaultYear;
			month = month ?? MetricsService.DefaultMonth;
			return this.MetricsRepository.GetBankAmountDistribution(year.Value, month.Value);
		}
	}
}
