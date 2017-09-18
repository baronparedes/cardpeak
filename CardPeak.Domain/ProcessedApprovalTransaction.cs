using System.Collections.Generic;

namespace CardPeak.Domain
{
    public sealed class ProcessedApprovalTransaction
    {
        public ApprovalTransaction Transaction { get; set; }
        public DebitCreditTransaction SavingsTransaction { get; set; }
        public string Alias { get; set; }
        public int Row { get; set; }
        public bool HasErrors { get; set; }
        public IList<string> ErrorMessages { get; set; }
        public bool ValidApproval { get; set; }
    }
}
