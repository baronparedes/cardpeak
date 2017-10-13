using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class AgentDashboardTransaction
    {
        public long TransactionId { get; set; }
        public int TransactionType { get; set; }
        public string Details { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal TransactionAmount { get; set; }
        public decimal RunningBalance { get; set; }
    }
}
