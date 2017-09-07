using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class BatchUploadConfiguration
    {
        public int BatchUploadConfigurationId { get; set; }
        public int BankId { get; set; }
        public Reference Bank { get; set; }
        public bool HasHeader { get; set; }
        public int? SkipNumberOfRows { get; set; }
        public int? AliasColumn { get; set; }
        public int? ProductTypeColumn { get; set; }
        public int? Ref1Column { get; set; }
        public int? Ref2Column { get; set; }
        public int? ClientFullNameColumn { get; set; }
        public int? ClientFirstNameColumn { get; set; }
        public int? ClientMiddleNameColumn { get; set; }
        public int? ClientLastNameColumn { get; set; }
        public int? ApprovalDateColumn { get; set; }
        public int? CardCountColumn { get; set; }
        public int? CardCategoryColumn { get; set; }
    }
}
