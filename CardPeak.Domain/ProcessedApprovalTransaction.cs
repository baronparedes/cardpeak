using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class ProcessedApprovalTransaction
    {
        public IList<ApprovalTransaction> Processed { get; set; }
        public IList<ApprovalTransaction> Errors { get; set; }
    }
}
