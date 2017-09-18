using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace CardPeak.Repository.EF
{
    public sealed class ApprovalTransactionRepository : Repository<ApprovalTransaction, CardPeakDbContext>, IApprovalTransactionRepository
    {
        public ApprovalTransactionRepository(CardPeakDbContext context) : base(context) { }

        private IQueryable<ApprovalTransaction> QueryByAgentAndDateRange(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context
                .ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.AgentId == agentId)
                .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) >= startDate.Date);

            if (endDate != null && startDate.Date <= endDate.Value.Date)
            {
                result = result
                    .Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) <= DbFunctions.TruncateTime(endDate.Value));
            }

            return result;
        }

        public override IEnumerable<ApprovalTransaction> Find(Expression<Func<ApprovalTransaction, bool>> predicate)
        {
            return this.Context.Set<ApprovalTransaction>()
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(predicate);
        }

        public IEnumerable<ApprovalTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.QueryByAgentAndDateRange(agentId, startDate, endDate);
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

        public override void Add(ApprovalTransaction transaction)
        {
            this.Context.Entry(transaction).State = EntityState.Added;
            if (transaction.CardCategory != null)
            {
                this.Context.Entry(transaction.CardCategory).State = EntityState.Unchanged;
            }
            this.Context.ApprovalTransactions.Add(transaction);
        }

        public decimal GetAgentAccountBalance(int agentId)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == agentId && !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .Select(balance => balance.Sum(_ => _.Amount))
                .FirstOrDefault();
        }

        public decimal GetAgentTotalApprovals(int agentId)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == agentId && !_.IsDeleted)
                .Select(_ => _.Units)
                .DefaultIfEmpty(0)
                .Sum();
        }

        public IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int agentId)
        {
            var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-3);
            var endDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(1).AddDays(-1);
            var result = new Dictionary<string, decimal>
            {
                { DateTime.Now.AddMonths(-2).ToString(Configurations.MonthFormat), 0 },
                { DateTime.Now.AddMonths(-1).ToString(Configurations.MonthFormat), 0 },
                { DateTime.Now.ToString(Configurations.MonthFormat), 0 }
            };


            var query = this.Context.ApprovalTransactions
                .Where(_ => _.AgentId == agentId)
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
                result[new DateTime(DateTime.Now.Year, _.Month, 1).ToString(Configurations.MonthFormat)] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByBank(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.Bank)
                .OrderBy(_ => _.Description)
                .ToDictionary(_ => _.Description, _ => 0m);

            var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
                .GroupBy(_ => _.BankId)
                .Select(_ => new  { Bank = _.FirstOrDefault().Bank.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            query.ForEach(_ => {
                result[_.Bank] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByCategory(int agentId, DateTime startDate, DateTime? endDate)
        {
            var result = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.CardCategory)
                .OrderBy(_ => _.Description)
                .ToDictionary(_ => _.Description, _ => 0m);

            var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
                .GroupBy(_ => _.BankId)
                .Select(_ => new { CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            query.ForEach(_ => {
                result[_.CardCategory] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public decimal GetAccountBalance(int year, int month)
        {
            var result = this.Context.ApprovalTransactions
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .Select(_ => _.Amount)
                .DefaultIfEmpty(0)
                .Sum();

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
            var startDate = new DateTime(year, 1, 1);
            var endDate = new DateTime(year, 12, 31);
            var result = new Dictionary<string, decimal>();

            for (int i = 1; i <= 12; i++)
            {
                result.Add(new DateTime(year, i, 1).ToString(Configurations.MonthFormat), 0);
            }

            var query = this.Context.ApprovalTransactions
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
                result[new DateTime(year, _.Month, 1).ToString(Configurations.MonthFormat)] = _.Approvals;
            });

            return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
        }

        public IEnumerable<ApprovalMetric<Agent>> GetTopAgents(int year, int month)
        {
            var result = this.Context.ApprovalTransactions
                .Include(_ => _.Agent)
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .GroupBy(_ => _.AgentId)
                .OrderByDescending(_ => _.Sum(t => t.Units))
                .Take(Configurations.TopAgentCount)
                .Select(_ => new ApprovalMetric<Agent> { Key = _.FirstOrDefault().Agent, Value = _.Sum(t => t.Units) })
                .ToList();

            return result;
        }

        public IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetApprovalsByBankDetails(int year, int month)
        {
            var banks = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.Bank)
                .OrderBy(_ => _.Description)
                .ToList();

            var categories = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.CardCategory)
                .OrderBy(_ => _.Description)
                .ToList();

            var query = this.Context.ApprovalTransactions
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => _.ApprovalDate.Year == year && _.ApprovalDate.Month == month)
                .Where(_ => !_.IsDeleted)
                .GroupBy(_ => new { _.BankId, _.CardCategoryId })
                .Select(_ => new { BankId = _.FirstOrDefault().Bank.ReferenceId, CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            var result = new Dictionary<string, IEnumerable<ApprovalMetric<string>>>();

            foreach (var item in banks)
            {
                var metrics = categories.ToDictionary(_ => _.Description, _ => 0m);
                query.Where(_ => _.BankId == item.ReferenceId)
                    .ToList()
                    .ForEach(_ => {
                        metrics[_.CardCategory] = _.Approvals;
                    });

                result.Add(item.Description, metrics.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value }));
            }

            return result;
        }

        public IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetAgentApprovalsByBankDetails(int agentId, DateTime startDate, DateTime? endDate)
        {
            var banks = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.Bank)
                .OrderBy(_ => _.Description)
                .ToList();

            var categories = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.CardCategory)
                .OrderBy(_ => _.Description)
                .ToList();

            var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
                .GroupBy(_ => new { _.BankId, _.CardCategoryId })
                .Select(_ => new { BankId = _.FirstOrDefault().Bank.ReferenceId, CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
                .ToList();

            var result = new Dictionary<string, IEnumerable<ApprovalMetric<string>>>();

            foreach (var item in banks)
            {
                var metrics = categories.ToDictionary(_ => _.Description, _ => 0m);
                query.Where(_ => _.BankId == item.ReferenceId)
                    .ToList()
                    .ForEach(_ => {
                        metrics[_.CardCategory] = _.Approvals;
                    });

                result.Add(item.Description, metrics.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value }));
            }

            return result;
        }

        public IEnumerable<ApprovalMetric<int>> GetAvailableYears()
        {
            var result = this.Context.ApprovalTransactions
                .Where(_ => !_.IsDeleted)
                .GroupBy(_ => _.ApprovalDate.Year)
                .Select(_ => new ApprovalMetric<int> {
                    Key = _.FirstOrDefault().ApprovalDate.Year,
                    Value = _.Sum(t => t.Units)
                })
                .ToList();

            if (!result.Any(_ => _.Key == DateTime.Now.Year))
            {
                result.Add(new ApprovalMetric<int> { Key = DateTime.Now.Year, Value = 0m });
            }

            return result.OrderBy(_ => _.Key);
        }
    }
}
