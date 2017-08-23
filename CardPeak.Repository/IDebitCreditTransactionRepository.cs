using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository
{
    public interface IDebitCreditTransactionRepository : IRepository<DebitCreditTransaction>
    {
        IEnumerable<DebitCreditTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate);
        decimal AccountBalanceByAgent(int id);
        decimal SavingsBalanceByAgent(int id);
    }
}
