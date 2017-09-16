using System.Collections.Generic;

namespace CardPeak.Domain
{
    public sealed class Dashboard
    {
        public IEnumerable<BatchUpload> LatestProcessedBatch { get; set; }
        public decimal AccountBalance { get; set; }
        public decimal TotalApprovals { get; set; }
        public Dictionary<string, decimal> ApprovalsByBank { get; set; }
        public Dictionary<string, decimal> ApprovalsByCategory { get; set; }
        public IEnumerable<ApprovalPerformance> Performance { get; set; }
    }
}
