using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF
{
    public sealed class DebitCreditTransactionRepository : Repository<DebitCreditTransaction, CardPeakDbContext>, IDebitCreditTransactionRepository
    {
        public DebitCreditTransactionRepository(CardPeakDbContext context) : base(context)
        {
        }

        private decimal GetBalanceByAgent(int id, int type)
        {
            return this.Context.DebitCreditTransactions
                .Where(_ => _.TransactionTypeId == type && _.AgentId == id)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal AccountBalanceByAgent(int id)
        {
            return this.GetBalanceByAgent(id, 1);
        }

        public decimal SavingsBalanceByAgent(int id)
        {
            return this.GetBalanceByAgent(id, 2);
        }

        public IEnumerable<DebitCreditTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context.DebitCreditTransactions.Where(_ => _.AgentId == id);
            if (endDate.HasValue)
            {
                result.Where(_ => _.TransactionDateTime >= startDate.Date && _.TransactionDateTime <= endDate.GetValueOrDefault().Date);
            }
            else
            {
                result.Where(_ => _.TransactionDateTime >= startDate.Date);
            }

            return result.ToList();
        }
    }
}
