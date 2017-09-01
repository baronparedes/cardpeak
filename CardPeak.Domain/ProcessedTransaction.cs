using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class ProcessedTransaction
    {
        public ApprovalTransaction Transaction { get; set; }
        public bool HasErrors { get; set; }
    }
}
