﻿using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Domain.Metrics;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;


namespace CardPeak.Repository.EF
{
	public sealed class ApprovalTransactionDashboardRepository : ApprovalTransactionRepository, IApprovalTransactionDashboardRepository
	{
		public ApprovalTransactionDashboardRepository(CardPeakDbContext context) : base(context)
		{
		}

		private IQueryable<ApprovalTransaction> QueryDashboard(int year, int month)
		{
			var query = this.Context.ApprovalTransactions
				.Include(_ => _.Bank)
				.Include(_ => _.CardCategory)
				.Where(_ => !_.Agent.IsDeleted)
				.Where(_ => !_.IsDeleted);

			if (year != 0)
			{
				query = query.Where(_ => _.ApprovalDate.Year == year);
			}

			if (month != 0)
			{
				query = query.Where(_ => _.ApprovalDate.Month == month);
			}

			return query;
		}

		public decimal GetAccountBalance(int year, int month)
		{
			var result = this.QueryDashboard(year, month)
				.Select(_ => _.Amount)
				.DefaultIfEmpty(0)
				.Sum();

			return result;
		}

		public decimal GetTotalApprovals(int year, int month)
		{
			var result = this.QueryDashboard(year, month)
				.Select(_ => _.Units)
				.DefaultIfEmpty(0)
				.Sum();
			return result;
		}

		public IEnumerable<ApprovalMetric<string>> GetApprovalsByBank(int year, int month)
		{
			var result = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank)
				.ToDictionary(_ => _.Description, _ => 0m);

			var query = this.QueryDashboard(year, month)
				.GroupBy(_ => _.BankId)
				.Select(_ => new { Bank = _.FirstOrDefault().Bank.Description, Approvals = _.Sum(t => t.Units) })
				.ToList();

			query.ForEach(_ =>
			{
				result[_.Bank] = _.Approvals;
			});

			return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
		}

		public IEnumerable<ApprovalMetric<string>> GetApprovalsByCategory(int year, int month)
		{
			var result = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory)
				.ToDictionary(_ => _.Description, _ => 0m);

			var query = this.QueryDashboard(year, month)
				.GroupBy(_ => _.CardCategoryId)
				.Select(_ => new { CardCategory = _.FirstOrDefault().CardCategory.Description, Approvals = _.Sum(t => t.Units) })
				.ToList();

			query.ForEach(_ =>
			{
				result[_.CardCategory] = _.Approvals;
			});

			return result.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value });
		}

		public IEnumerable<ApprovalMetric<string>> GetYearlyPerformance(int year)
		{
			if (year == 0)
			{
				return null;
			}

			var startDate = new DateTime(year, 1, 1);
			var endDate = new DateTime(year, 12, 31);
			var result = new Dictionary<string, dynamic>();

			for (int i = 1; i <= 12; i++)
			{
				result.Add(new DateTime(year, i, 1).ToString(Configurations.MonthFormat), null);
			}

			var query = this.Context.ApprovalTransactions
				.Where(_ => !_.IsDeleted)
				.Where(_ => _.ApprovalDate >= startDate && _.ApprovalDate <= endDate)
				.GroupBy(_ => _.ApprovalDate.Month)
				.Select(_ => new
				{
					_.FirstOrDefault().ApprovalDate.Month,
					Approvals = _.Sum(approvals => approvals.Units),
					Amount = _.Sum(approvals => approvals.Amount)
				})
				.ToList();

			query.ForEach(_ =>
			{
				result[new DateTime(year, _.Month, 1).ToString(Configurations.MonthFormat)] = new
				{
					_.Approvals,
					_.Amount
				};
			});

			return result.Select(_ => new ApprovalMetric<string>
			{
				Key = _.Key,
				Value = _.Value?.Approvals ?? 0,
				Amount = _.Value?.Amount ?? 0
			});
		}

		public IEnumerable<ApprovalMetric<Agent>> GetTopAgents(int year, int month)
		{
			var result = this.QueryDashboard(year, month)
				.Include(_ => _.Agent)
				.GroupBy(_ => _.AgentId)
				.OrderByDescending(_ => _.Sum(t => t.Units))
				.Select(_ => new ApprovalMetric<Agent> { Key = _.FirstOrDefault().Agent, Value = _.Sum(t => t.Units) })
				.Take(Configurations.TopAgentCount)
				.ToList();

			return result;
		}

		public IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetApprovalsByBankDetails(int year, int month)
		{
			var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank).ToList();
			var categories = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory).ToList();

			var query = this.QueryDashboard(year, month)
				.GroupBy(_ => new { _.BankId, _.CardCategoryId })
				.Select(_ => new
				{
					BankId = _.FirstOrDefault().Bank.ReferenceId,
					CardCategory = _.FirstOrDefault().CardCategory.Description,
					Approvals = _.Sum(t => t.Units)
				})
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

		public IEnumerable<ApprovalMetric<int>> GetAvailableYears()
		{
			var result = this.Context.ApprovalTransactions
				.Where(_ => !_.Agent.IsDeleted)
				.Where(_ => !_.IsDeleted)
				.GroupBy(_ => _.ApprovalDate.Year)
				.Select(_ => new ApprovalMetric<int>
				{
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

		public IEnumerable<ApprovalMetric<int>> GetAvailableYearsByTeam(int teamId)
		{
			var agents = this.Context.TeamPlacements
				.Where(_ => _.TeamId == teamId)
				.Select(_ => _.AgentId)
				.Distinct();

			var result = this.Context.ApprovalTransactions
				.Where(_ => !_.Agent.IsDeleted)
				.Where(_ => !_.IsDeleted)
				.Where(_ => agents.Contains(_.AgentId))
				.GroupBy(_ => _.ApprovalDate.Year)
				.Select(_ => new ApprovalMetric<int>
				{
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