using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository
{
    public interface IApprovalTransactionRepository : IRepository<ApprovalTransaction>
    {
        IEnumerable<ApprovalTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate);
        decimal ApprovalsByAgent(int id);
        decimal AccountBalanceByAgent(int id);
    }
}
