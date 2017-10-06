﻿using CardPeak.Domain.Metrics;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IMetricsService : IUnitOfWork
    {
        AgentMetrics GetAgentApprovalMetrics(int? year, int? month);
        IEnumerable<AgentRankMetric> GetAgentRankMetrics(int? year, int? month);
    }
}
