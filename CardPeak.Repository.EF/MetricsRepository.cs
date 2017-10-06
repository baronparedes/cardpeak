using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class MetricsRepository : ContextBase<CardPeakDbContext>, IMetricsRepository
    {
        public MetricsRepository(CardPeakDbContext context) : base(context)
        {
        }

        private IQueryable<ApprovalTransaction> QueryDashboard(int year, int month)
        {
            var query = this.Context.ApprovalTransactions
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => _.ApprovalDate.Year == year)
                .Where(_ => !_.IsDeleted);

            if (month != 0)
            {
                query = query.Where(_ => _.ApprovalDate.Month == month);
            }

            return query;
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

        private IQueryable<DebitCreditTransaction> QueryDebitCreditTransactionByYearMonth(int year, int month)
        {
            var result = this.Context.DebitCreditTransactions
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionDateTime.Year == year);

            if (month != 0)
            {
                result = result
                    .Where(_ => _.TransactionDateTime.Month == month);
            }

            return result;
        }

        public IEnumerable<AgentApprovalMetric> GetApprovalsByAgent(int year, int month)
        {
            var agents = this.Context.Agents
                .Where(_ => !_.IsDeleted)
                .OrderBy(_ => _.FirstName)
                .ThenBy(_ => _.LastName)
                .ToList();

            var approvalTransactions = this.QueryApprovalTransactionsByYearMonth(year, month)
                .GroupBy(_ => _.AgentId)
                .Select(_ => new
                {
                    AgentId = _.FirstOrDefault().AgentId,
                    Amount = _.Sum(at => at.Amount),
                    Units = _.Sum(at => at.Units)
                })
                .ToList();

            var debitCreditSavingsTransactions = this.QueryDebitCreditTransactionByYearMonth(year, month)
                .GroupBy(_ => new { _.AgentId, _.TransactionTypeId })
                .Select(_ => new
                {
                    AgentId = _.FirstOrDefault().AgentId,
                    TransactionTypeId = _.FirstOrDefault().TransactionTypeId,
                    Amount = _.Sum(dct => dct.Amount)
                })
                .ToList();

            var result = agents
                .Select(_ => new AgentApprovalMetric
                {
                    Key = _,
                    Value = approvalTransactions
                        .Where(at => at.AgentId == _.AgentId)
                        .Select(at => at.Units)
                        .DefaultIfEmpty(0)
                        .Sum(),
                    SavingsBalance = debitCreditSavingsTransactions
                        .Where(dcst => dcst.AgentId == _.AgentId)
                        .Where(dcst => dcst.TransactionTypeId == (int)Domain.Enums.TransactionTypeEnum.SavingsTransaction)
                        .Select(at => at.Amount)
                        .DefaultIfEmpty(0)
                        .Sum(),
                    AccountBalance =
                        approvalTransactions
                            .Where(at => at.AgentId == _.AgentId)
                            .Select(at => at.Amount)
                            .DefaultIfEmpty(0)
                            .Sum() +
                        debitCreditSavingsTransactions
                            .Where(dcst => dcst.AgentId == _.AgentId)
                            .Where(dcst => dcst.TransactionTypeId == (int)Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
                            .Select(at => at.Amount)
                            .DefaultIfEmpty(0)
                            .Sum()
                });

            return result;
        }

        public IEnumerable<AgentRankMetric> GetAgentRankings(int year, int month)
        {
            return new List<AgentRankMetric> { new AgentRankMetric() };
            //var result = this.QueryDashboard(year, month)
            //    .Include(_ => _.Agent)
            //    .GroupBy(_ => _.AgentId)
            //    .OrderByDescending(_ => _.Sum(t => t.Units))
            //    .Select(_ => new ApprovalMetric<Agent> { Key = _.FirstOrDefault().Agent, Value = _.Sum(t => t.Units) })
            //    .ToList();

            //return result;
        }
    }
}
