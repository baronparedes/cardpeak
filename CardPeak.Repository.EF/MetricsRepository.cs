using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class MetricsRepository : ContextBase<CardPeakDbContext>
    {
        public MetricsRepository(CardPeakDbContext context) : base(context)
        {
        }


        private IQueryable<ApprovalTransaction> QueryApprovalTransactionsByYearMonth(int year, int month)
        {
            var result = this.Context.ApprovalTransactions
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.ApprovalDate.Year == year);

            if (month != 0)
            {
                result = result
                    .Where(_ => _.ApprovalDate.Month == month);
            }

            return result;
        }

        private IQueryable<DebitCreditTransaction> QueryDebitCreditTransactionByYearMonth(int year, int month, Domain.Enums.TransactionTypeEnum transactionType)
        {
            var result = this.Context.DebitCreditTransactions
                .Where(_ => _.TransactionTypeId == (int)transactionType)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionDateTime.Year == year);

            if (month != 0)
            {
                result = result
                    .Where(_ => _.TransactionDateTime.Month == month);
            }

            return result;
        }

        public IEnumerable<AgentApprovalMetric> ApprovalsByAgent(int year, int month)
        {
            var result = this.Context.Agents
                .Select(_ => new AgentApprovalMetric
                {
                    Key = _,
                    Value = this.QueryApprovalTransactionsByYearMonth(year, month).Where(at => at.AgentId == _.AgentId).Sum(at => at.Units),
                    AccountBalance = this.QueryApprovalTransactionsByYearMonth(year, month).Where(at => at.AgentId == _.AgentId).Sum(at => at.Amount) +
                        this.QueryDebitCreditTransactionByYearMonth(year, month, Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
                            .Where(dct => dct.AgentId == _.AgentId).Sum(dct => dct.Amount),
                    SavingsBalance =
                        this.QueryDebitCreditTransactionByYearMonth(year, month, Domain.Enums.TransactionTypeEnum.SavingsTransaction)
                            .Where(dct => dct.AgentId == _.AgentId).Sum(dct => dct.Amount),
                });

            return result;
        }
    }
}
