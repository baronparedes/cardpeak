using System.Collections.Generic;

namespace CardPeak.Domain
{
    public sealed class ProcessedBatchUpload
    {
        public BatchUpload Batch { get; set; }
        public IEnumerable<ProcessedApprovalTransaction> ProcessedApprovalTransactions { get; set; }
    }
}
