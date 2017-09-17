using CardPeak.Core.Repository;
using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace CardPeak.Repository.EF
{
    public sealed class ApprovalTransactionRepository : Repository<ApprovalTransaction, CardPeakDbContext>, IApprovalTransactionRepository
    {
        public ApprovalTransactionRepository(CardPeakDbContext context) : base(context)
        {
        }

        public override IEnumerable<ApprovalTransaction> Find(Expression<Func<ApprovalTransaction, bool>> predicate)
        {
            return this.Context.Set<ApprovalTransaction>()
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(predicate);
        }

        public override void Add(ApprovalTransaction transaction)
        {
            this.Context.Entry(transaction).State = EntityState.Added;
            if (transaction.CardCategory != null)
            {
                this.Context.Entry(transaction.CardCategory).State = EntityState.Unchanged;
            }
            this.Context.ApprovalTransactions.Add(transaction);
        }

        public decimal GetAccountBalanceByAgent(int id)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal GetTotalApprovalsByAgent(int id)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .Select(_ => _.Units)
                .DefaultIfEmpty(0)
                .Sum();
        }

        public IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int id)
        {
            var result = new Dictionary<string, decimal>
            {
                { DateTime.Now.ToString("MMM"), 0 },
                { DateTime.Now.AddMonths(-1).ToString("MMM"), 0 },
                { DateTime.Now.AddMonths(-2).ToString("MMM"), 0 },
                { DateTime.Now.AddMonths(-3).ToString("MMM"), 0 }
            };

            var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-3);
            var endDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(1).AddDays(-1);

            var query = this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == id)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.ApprovalDate >= startDate && _.ApprovalDate <= endDate)
                .GroupBy(_ => _.ApprovalDate.Month)
                .Select(_ => new
                {
                    Month = _.FirstOrDefault().ApprovalDate.Month,
                    Approvals = _.Sum(approvals => approvals.Units)
                })
                .ToList();

            query.ForEach(_ => {
                result[new DateTime(DateTime.Now.Year, _.Month, 1).ToString("MMM")] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context
                .ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.AgentId == id && !_.IsDeleted)
                .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) >= startDate.Date);

            if (endDate != null && startDate.Date <= endDate.Value.Date)
            {
                result = result
                    .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) <= DbFunctions.TruncateTime(endDate.Value));
            }

            result = result
                .OrderBy(_ => _.ApprovalDate)
                .ThenBy(_ => _.Client);

            return result.ToList();
        }

        public IEnumerable<ApprovalTransaction> FindByClient(string client)
        {
            var result = this.Context.ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.Client.ToLower().Contains(client.ToLower()))
                .OrderBy(_ => _.Client);
            return result.ToList();
        }

        public decimal GetAccountBalance(int year, int month)
        {
            var result = this.Context.ApprovalTransactions
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .Sum(_ => _.Amount);
            return result;
        }

        public decimal GetTotalApprovals(int year, int month)
        {
            var result = this.Context.ApprovalTransactions
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .Count();
            return result;
        }

        public IEnumerable<ApprovalMetric<string>> GetApprovalsByBank(int year, int month)
        {
            var result = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.Bank)
                .OrderBy(_ => _.Description)
                .ToDictionary(_ => _.Description, _ => 0m);

            var query = this.Context.ApprovalTransactions
                .Include(_ => _.Bank)
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .GroupBy(_ => _.BankId)
                .Select(_ => new { Bank = _.FirstOrDefault().Bank.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            query.ForEach(_ => {
                result[_.Bank] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalMetric<string>> GetApprovalsByCategory(int year, int month)
        {
            var result = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.CardCategory)
                .OrderBy(_ => _.Description)
                .ToDictionary(_ => _.Description, _ => 0m);

            var query = this.Context.ApprovalTransactions
                .Include(_ => _.CardCategory)
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .GroupBy(_ => _.CardCategoryId)
                .Select(_ => new { CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            query.ForEach(_ => {
                result[_.CardCategory] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalMetric<string>> GetYearlyPerformance(int year)
        {
            return null;
        }

        public IEnumerable<ApprovalMetric<Agent>> GetTopAgents(int year, int month)
        {
            var result = this.Context.ApprovalTransactions
                .Include(_ => _.Agent)
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .OrderByDescending(_ => _.Sum(t => t.Units))
                .Take(10)
                .Select(_ => new ApprovalMetric<Agent> { Key = _.FirstOrDefault().Agent, Value = _.Sum(t => t.Units) })
                .ToList();

            return result;
        }
    }
}
