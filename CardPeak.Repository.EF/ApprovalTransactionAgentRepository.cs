using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Domain.Metrics;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
	public sealed class ApprovalTransactionAgentRepository : ApprovalTransactionRepository, IApprovalTransactionAgentRepository
	{
		public ApprovalTransactionAgentRepository(CardPeakDbContext context) : base(context)
		{
		}

		private IQueryable<ApprovalTransaction> QueryByAgentAndDateRange(int agentId, DateTime startDate, DateTime? endDate)
		{
			var result = this.Context.ApprovalTransactions
				.Include(_ => _.Agent)
				.Include(_ => _.Bank)
				.Include(_ => _.CardCategory)
				.Where(_ => !_.IsDeleted)
				.Where(_ => !_.Agent.IsDeleted)
				.Where(_ => _.AgentId == agentId)
				.Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) >= startDate.Date);

			if (endDate != null && startDate.Date <= endDate.Value.Date)
			{
				result = result
					.Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) <= DbFunctions.TruncateTime(endDate.Value));
			}

			return result;
		}

		public IEnumerable<ApprovalTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate)
		{
			var result = this.QueryByAgentAndDateRange(agentId, startDate, endDate);
			result = result
				.OrderByDescending(_ => _.Id);

			return result
				.AsNoTracking()
				.ToList();
		}

		public decimal GetAgentAccountBalance(int agentId, DateTime? endDate = null)
		{
			var result = this.Context.ApprovalTransactions
				.Where(_ => _.AgentId == agentId && !_.IsDeleted);

			if (endDate.HasValue)
			{
				result = result.Where(_ => DbFunctions.TruncateTime(_.ApprovalDate) <= endDate.Value);
			}

			return result
				.GroupBy(_ => _.AgentId)
				.Select(balance => balance.Sum(_ => _.Amount))
				.FirstOrDefault();
		}

		public decimal GetAgentTotalApprovals(int agentId, DateTime startDate, DateTime? endDate)
		{
			return this.QueryByAgentAndDateRange(agentId, startDate, endDate)
				.Select(_ => _.Units)
				.DefaultIfEmpty(0)
				.Sum();
		}

		public IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int agentId)
		{
			return this.GetPerformance(this.GetPerformanceQueryByAgent, agentId, DateTime.Now, true);
		}

		public IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int agentId, int year)
		{
			return this.GetPerformance(this.GetPerformanceQueryByAgent, agentId, new DateTime(year, 12, 31), false);
		}

		public IEnumerable<ApprovalMetric<string>> GetTeamPerformance(int teamId, int year)
		{
			return this.GetPerformance(this.GetPerformanceQueryByTeam, teamId, new DateTime(year, 12, 31), false);
		}

		private IQueryable<IGrouping<int, ApprovalTransaction>> GetPerformanceQueryByAgent(int agentId, DateTime startDate, DateTime endDate)
		{
			var query = this.Context.ApprovalTransactions
				.Where(_ => _.AgentId == agentId)
				.Where(_ => !_.IsDeleted)
				.Where(_ => _.ApprovalDate >= startDate && _.ApprovalDate <= endDate)
				.GroupBy(_ => _.ApprovalDate.Month);

			return query;
		}

		private IQueryable<IGrouping<int, ApprovalTransaction>> GetPerformanceQueryByTeam(int teamId, DateTime startDate, DateTime endDate)
		{
			var agents = this.Context.TeamPlacements
				.Where(_ => _.TeamId == teamId)
				.Select(_ => _.AgentId);

			var query = this.Context.ApprovalTransactions
				.Where(_ => agents.Contains(_.AgentId))
				.Where(_ => !_.IsDeleted)
				.Where(_ => _.ApprovalDate >= startDate && _.ApprovalDate <= endDate)
				.GroupBy(_ => _.ApprovalDate.Month);

			return query;
		}

		private IEnumerable<ApprovalMetric<string>> GetPerformance(
			Func<int, DateTime, DateTime, IQueryable<IGrouping<int, ApprovalTransaction>>> getQuery,
			int id, DateTime targetDate, bool showAmount)
		{
			var months = Configurations.DisplayAgentPerformanceMonths;
			var previousMonthsExcludingCurrentMonth = (months - 1) * -1;
			var startDate = new DateTime(targetDate.Year, targetDate.Month, 1).AddMonths(previousMonthsExcludingCurrentMonth);
			var endDate = new DateTime(targetDate.Year, targetDate.Month, 1).AddMonths(1).AddDays(-1);
			var result = new Dictionary<string, dynamic>();
			for (int i = previousMonthsExcludingCurrentMonth; i < 1; i++)
			{
				result.Add(targetDate.AddMonths(i).ToString(Configurations.MonthFormat), null);
			}

			var query = getQuery(id, startDate, endDate)
				.AsNoTracking()
				.Select(_ => new
				{
					_.FirstOrDefault().ApprovalDate.Month,
					Approvals = _.Sum(approvals => approvals.Units),
					Amount = _.Sum(approvals => approvals.Amount)
				})
				.ToList();

			query.ForEach(_ =>
			{
				result[new DateTime(targetDate.Year, _.Month, 1).ToString(Configurations.MonthFormat)] = new
				{
					_.Approvals,
					_.Amount
				};
			});

			return result.Select(_ => new ApprovalMetric<string>
			{
				Key = _.Key,
				Value = _.Value?.Approvals ?? 0,
				Amount = showAmount ? _.Value?.Amount ?? 0 : 0
			});
		}

		public IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByBank(int agentId, DateTime startDate, DateTime? endDate)
		{
			var result = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank)
				.ToDictionary(_ => _.Description, _ => 0m);

			var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
				.GroupBy(_ => _.BankId)
				.Select(_ => new { Bank = _.FirstOrDefault().Bank.Description, Approvals = _.Sum(t => t.Units) })
				.ToList();

			query.ForEach(_ =>
			{
				result[_.Bank] = _.Approvals;
			});

			return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
		}

		public IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByCategory(int agentId, DateTime startDate, DateTime? endDate)
		{
			var result = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory)
				.ToDictionary(_ => _.Description, _ => 0m);

			var query = this.QueryByAgentAndDateRange(agentId, startDate, endDate)
				.GroupBy(_ => _.BankId)
				.Select(_ => new { CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
				.ToList();

			query.ForEach(_ =>
			{
				result[_.CardCategory] = _.Approvals;
			});

			return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
		}

		public IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetAgentApprovalsByBankDetails(int agentId, DateTime startDate, DateTime? endDate)
		{
			var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank).ToList();
			var categories = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory).ToList();

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
					.ForEach(_ =>
					{
						metrics[_.CardCategory] = _.Approvals;
					});

				result.Add(item.Description, metrics.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value }));
			}

			return result;
		}
	}
}
