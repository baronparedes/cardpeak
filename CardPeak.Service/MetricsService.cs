using CardPeak.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using CardPeak.Core.Repository;
using CardPeak.Repository.EF;

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
