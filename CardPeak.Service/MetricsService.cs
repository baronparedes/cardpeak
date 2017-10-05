using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
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

        public IEnumerable<AgentApprovalMetric> GetAgentApprovalMetrics(int? year, int? month)
        {
            year = year ?? DateTime.Now.Year;
            month = month ?? 0;
            return this.MetricsRepository.GetApprovalsByAgent(year.Value, month.Value);
        }
    }
}
