using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class ProcessedBatchUpload
    {
        public BatchUpload Batch { get; set; }
        public IEnumerable<ProcessedApprovalTransaction> ProcessedApprovalTransactions { get; set; }
    }
}
