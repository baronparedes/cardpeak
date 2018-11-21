using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Domain.Metrics;
using CardPeak.Repository.EF.Core;
using System;
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

		private IQueryable<Reference> QueryReference(Domain.Enums.ReferenceTypeEnum referenceType)
		{
			var query = this.Context.References
				.Where(_ => _.ReferenceTypeId == (int)referenceType)
				.OrderBy(_ => _.Description);

			return query;
		}

		private IQueryable<ApprovalTransaction> QueryApprovalTransactionsByYearMonth(int year, int month)
		{
			var query = this.Context.ApprovalTransactions
				.Where(_ => !_.IsDeleted)
				.Where(_ => !_.Agent.IsDeleted);

			if (year != 0)
			{
				query = query.Where(_ => _.ApprovalDate.Year == year);
			}

			if (month != 0)
			{
				query = query
					.Where(_ => _.ApprovalDate.Month == month);
			}

			return query;
		}

		private IQueryable<DebitCreditTransaction> QueryDebitCreditTransactionByYearMonth(int year, int month)
		{
			var query = this.Context.DebitCreditTransactions
				.Where(_ => !_.IsDeleted)
				.Where(_ => !_.Agent.IsDeleted);

			if (year != 0)
			{
				query = query
					.Where(_ => _.TransactionDateTime.Year == year);
			}

			if (month != 0)
			{
				query = query
					.Where(_ => _.TransactionDateTime.Month == month);
			}

			return query;
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
					IncentivesBalance = debitCreditSavingsTransactions
						.Where(dcst => dcst.AgentId == _.AgentId)
						.Where(dcst => dcst.TransactionTypeId == (int)Domain.Enums.TransactionTypeEnum.IncentivesTransaction)
						.Select(at => at.Amount)
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

		public IEnumerable<AgentRankMetric> GetAgentRankMetrics(int year, int month, int bankId)
		{
			var metricsQuery = this.QueryApprovalTransactionsByYearMonth(year, month);
			var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank)
				.AsNoTracking()
				.ToList();

			if (bankId != 0)
			{
				banks = banks.Where(_ => _.ReferenceId == bankId).ToList();
				metricsQuery = metricsQuery.Where(_ => _.BankId == bankId);
			}

			var metrics = metricsQuery
				.Include(_ => _.Bank)
				.Include(_ => _.Agent)
				.GroupBy(_ => new { _.AgentId, _.Agent })
				.OrderByDescending(_ => _.Sum(t => t.Units))
				.AsNoTracking()
				.ToList();

			var rank = 1;
			var result = new List<AgentRankMetric>();
			foreach (var agent in metrics)
			{
				var approvalsByBank = banks.ToDictionary(_ => _.ShortDescription, _ => 0m);
				agent.GroupBy(_ => _.BankId)
					.Select(_ => new
					{
						_.FirstOrDefault().BankId,
						Approvals = _.Sum(t => t.Units)
					}).ToList().ForEach(bank =>
					{
						var bankName = banks.Single(_ => _.ReferenceId == bank.BankId).ShortDescription;
						approvalsByBank[bankName] = bank.Approvals;
					});

				var agentRankMetric = new AgentRankMetric()
				{
					Rank = rank++,
					Key = agent.Key.Agent,
					Value = agent.Sum(_ => _.Units),
					ApprovalsByBank = approvalsByBank.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value })
				};

				result.Add(agentRankMetric);
			}

			return result;
		}

		public IEnumerable<AgentThresholdMetric> GetAgentThresholdMetrics(int year, int month)
		{
			var threshold = new Dictionary<int, List<int>>
			{
				{ 3, new List<int> { 7, 8, 9 } }, // EWB - CGP
				{ 4, new List<int> { 8, 9 } }, // SB - GP
				{ 5, new List<int> { 8, 9 } } // RCBC - GP
			};
			var thresholdBanks = threshold.Select(_ => _.Key);

			var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank)
							.Where(_ => thresholdBanks.Contains(_.ReferenceId))
							.AsNoTracking()
							.ToList();

			var metrics = this.QueryApprovalTransactionsByYearMonth(year, month)
				.Where(_ => thresholdBanks.Contains(_.BankId))
				.Include(_ => _.Bank)
				.Include(_ => _.Agent)
				.GroupBy(_ => new { _.AgentId, _.Agent })
				.AsNoTracking()
				.OrderByDescending(_ => _.Sum(t => t.Units))
				.ToList();

			var rank = 1;
			var result = new List<AgentThresholdMetric>();
			foreach (var agent in metrics)
			{
				var approvalsByBank = banks.ToDictionary(_ => _.ShortDescription, _ => 0m);
				agent.GroupBy(_ => _.BankId)
					.Select(_ => new
					{
						BankId = _.FirstOrDefault().BankId,
						Approvals = _.Where(t => threshold[_.FirstOrDefault().BankId].Contains(t.CardCategoryId))
							.Sum(t => t.Units)
					}).ToList().ForEach(bank =>
					{
						var bankName = banks.Single(_ => _.ReferenceId == bank.BankId).ShortDescription;
						approvalsByBank[bankName] = bank.Approvals;
					});

				var agentThresholdMetric = new AgentThresholdMetric()
				{
					Key = agent.Key.Agent,
					Value = approvalsByBank.Sum(_ => _.Value),
					ApprovalsByBank = approvalsByBank.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value })
				};

				result.Add(agentThresholdMetric);
			}

			result = result.OrderByDescending(_ => _.Value).ToList();
			foreach (var item in result)
			{
				item.Rank = rank++;
			}

			return result;
		}

		public IEnumerable<AgentPerformanceMetric> GetAgentPerformanceMetrics(int year)
		{
			var startDate = new DateTime(year, 1, 1);
			var endDate = new DateTime(year, 12, 31);
			var performanceYear = new Dictionary<string, decimal>();

			for (int i = 1; i <= 12; i++)
			{
				performanceYear.Add(new DateTime(year, i, 1).ToString(Configurations.MonthFormat), 0);
			}

			var metrics = this.QueryApprovalTransactionsByYearMonth(year, 0)
				.Include(_ => _.Agent)
				.GroupBy(_ => new { _.AgentId, _.Agent })
				.OrderByDescending(_ => _.Sum(t => t.Units))
				.AsNoTracking()
				.ToList();

			var rank = 1;
			var result = new List<AgentPerformanceMetric>();
			foreach (var agent in metrics)
			{
				var approvalsPerMonth = performanceYear.ToDictionary(_ => _.Key, _ => 0m);
				agent.GroupBy(_ => _.ApprovalDate.Month)
					.Select(_ => new
					{
						_.FirstOrDefault().ApprovalDate.Month,
						Approvals = _.Sum(approvals => approvals.Units)
					}).ToList().ForEach(item =>
					{
						approvalsPerMonth[new DateTime(year, item.Month, 1).ToString(Configurations.MonthFormat)] = item.Approvals;
					});

				var agentRankMetric = new AgentPerformanceMetric()
				{
					Rank = rank++,
					Key = agent.Key.Agent,
					Value = agent.Sum(_ => _.Units),
					Performance = approvalsPerMonth.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value })
				};

				result.Add(agentRankMetric);
			}

			return result;
		}

		public IEnumerable<BankAmountDistribution> GetBankAmountDistribution(int year, int month)
		{
			var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank).Select(_ => new { _.ReferenceId, _.Description });
			var cardCategories = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory).Select(_ => new { _.ReferenceId, _.Description });
			var query = this.QueryApprovalTransactionsByYearMonth(year, month)
				.GroupBy(_ => new { _.BankId, _.CardCategoryId, _.Amount })
				.Select(_ => new
				{
					_.FirstOrDefault().BankId,
					_.FirstOrDefault().CardCategoryId,
					_.FirstOrDefault().Amount,
					Approvals = _.Sum(approvals => approvals.Units)
				}).ToList();

			var result = new List<BankAmountDistribution>();
			foreach (var bank in banks)
			{
				var cardCategoryAmountDistribution = new List<AmountDistribution>();
				foreach (var cardCategory in cardCategories)
				{
					var approvalsByAmount = query
						.Where(q => q.BankId == bank.ReferenceId)
						.Where(q => q.CardCategoryId == cardCategory.ReferenceId)
						.Where(q => q.Approvals > 0)
						.Where(q => q.Amount > 0)
						.OrderBy(q => q.Amount)
						.Select(q => new ApprovalMetric<decimal>
						{
							Key = q.Amount,
							Value = q.Approvals
						});

					var amountDistribution = new AmountDistribution
					{
						Description = cardCategory.Description,
						ApprovalsByAmount = approvalsByAmount
					};

					cardCategoryAmountDistribution.Add(amountDistribution);
				}

				var item = new BankAmountDistribution
				{
					Description = bank.Description,
					CardCategoryAmountDistribution = cardCategoryAmountDistribution
				};

				result.Add(item);
			}

			return result;
		}
	}
}
