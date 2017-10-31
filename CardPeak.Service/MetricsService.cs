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
        private IMetricsRepository MetricsRepository;

        public MetricsService(CardPeakDbContext context) : base(context)
        {
            this.MetricsRepository = new MetricsRepository(context);
        }

        public AgentMetrics GetAgentApprovalMetrics(int? year, int? month)
        {
            year = year ?? DateTime.Now.Year;
            month = month ?? 0;
            return new AgentMetrics()
            {
                AgentApprovalMetrics = this.MetricsRepository.GetApprovalsByAgent(year.Value, month.Value)
            };
        }

        public IEnumerable<AgentPerformanceMetric> GetAgentPerformanceMetrics(int? year)
        {
            year = year ?? DateTime.Now.Year;
            return this.MetricsRepository.GetAgentPerformanceMetrics(year.Value);
        }

        public IEnumerable<AgentRankMetric> GetAgentRankMetrics(int? year, int? month)
        {
            year = year ?? DateTime.Now.Year;
            month = month ?? 0;
            return this.MetricsRepository.GetAgentRankMetrics(year.Value, month.Value);
        }

        public IEnumerable<AgentThresholdMetric> GetAgentThresholdMetrics(int? year, int? month)
        {
            year = year ?? DateTime.Now.Year;
            month = month ?? 0;
            return this.MetricsRepository.GetAgentThresholdMetrics(year.Value, month.Value);
        }

        public IEnumerable<BankAmountBreakdown> GetBankAmountBreakdownMetrics(int? year, int? month)
        {
            year = year ?? DateTime.Now.Year;
            month = month ?? 0;
            return this.MetricsRepository.GetBankAmountBreakdown(year.Value, month.Value);
        }
    }
}
