using System.Collections.Generic;

namespace CardPeak.Domain
{
    public sealed class Dashboard
    {
        public IEnumerable<BatchUpload> LatestProcessedBatch { get; set; }
        public decimal AccountBalance { get; set; }
        public decimal TotalApprovals { get; set; }
        public IEnumerable<Metric> ApprovalsByBank { get; set; }
        public IEnumerable<Metric> ApprovalsByCategory { get; set; }
        public IEnumerable<Metric> Performance { get; set; }
    }
}
