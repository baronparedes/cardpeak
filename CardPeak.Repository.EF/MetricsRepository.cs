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
            var result = this.Context.ApprovalTransactions
                .Where(_ => !_.IsDeleted)
                .Where(_ => !_.Agent.IsDeleted)
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
                .Where(_ => !_.Agent.IsDeleted)
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

        public IEnumerable<AgentRankMetric> GetAgentRankMetrics(int year, int month)
        {
            var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank)
                .AsNoTracking()
                .ToList();

            var metrics = this.QueryApprovalTransactionsByYearMonth(year, month)
                .Include(_ => _.Bank)
                .Include(_ => _.Agent)
                .GroupBy(_ => new { _.AgentId, _.Agent })
                .OrderByDescending(_ => _.Sum(t => t.Units))
                .ToList();

            var rank = 1;
            var result = new List<AgentRankMetric>();
            foreach (var agent in metrics)
            {
                var approvalsByBank = banks.ToDictionary(_ => _.ShortDescription, _ => 0m);
                agent.GroupBy(_ => _.BankId)
                    .Select(_ => new
                    {
                        BankId = _.FirstOrDefault().BankId,
                        Approvals = _.Sum(t => t.Units)
                    }).ToList().ForEach(bank => {
                        var bankName = banks.Single(_ => _.ReferenceId == bank.BankId).ShortDescription;
                        approvalsByBank[bankName] = bank.Approvals;
                    });

                var agentRankMetric = new AgentRankMetric()
                {
                    Rank = rank++,
                    Key = agent.FirstOrDefault().Agent,
                    Value = agent.Sum(_ => _.Units),
                    ApprovalsByBank = approvalsByBank.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value })
                };

                result.Add(agentRankMetric);
            }

            return result;
        }

        public IEnumerable<AgentTresholdMetric> GetAgentTresholdMetrics(int year, int month)
        {
            var tresholdBanks = new List<int> { 3, 4, 5 }; // EWB, SB, RCBC
            var tresholdCategories = new Dictionary<int, List<int>>
            {
                { 3, new List<int> { 7, 8, 9 } }, // EWB - CGP
                { 4, new List<int> { 8, 9 } }, // SB - GP
                { 5, new List<int> { 8, 9 } } // RCBC - GP
            };

            var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank)
                            .Where(_ => tresholdBanks.Contains(_.ReferenceId))
                            .AsNoTracking()
                            .ToList();

            var metrics = this.QueryApprovalTransactionsByYearMonth(year, month)
                .Where(_ => tresholdBanks.Contains(_.BankId))
                .Include(_ => _.Bank)
                .Include(_ => _.Agent)
                .GroupBy(_ => new { _.AgentId, _.Agent })
                .OrderByDescending(_ => _.Sum(t => t.Units))
                .ToList();

            var rank = 1;
            var result = new List<AgentTresholdMetric>();
            foreach (var agent in metrics)
            {
                var approvalsByBank = banks.ToDictionary(_ => _.ShortDescription, _ => 0m);
                agent.GroupBy(_ => _.BankId)
                    .Select(_ => new
                    {
                        BankId = _.FirstOrDefault().BankId,
                        Approvals = _.Where(t => tresholdCategories[_.FirstOrDefault().BankId].Contains(t.CardCategoryId))
                            .Sum(t => t.Units)
                    }).ToList().ForEach(bank => {
                        var bankName = banks.Single(_ => _.ReferenceId == bank.BankId).ShortDescription;
                        approvalsByBank[bankName] = bank.Approvals;
                    });

                var agentTresholdMetric = new AgentTresholdMetric()
                {
                    Rank = rank++,
                    Key = agent.FirstOrDefault().Agent,
                    Value = agent.Sum(_ => _.Units),
                    ApprovalsByBank = approvalsByBank.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value })
                };

                result.Add(agentTresholdMetric);
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
                .ToList();

            var rank = 1;
            var result = new List<AgentPerformanceMetric>();
            foreach (var agent in metrics)
            {
                var approvalsPerMonth = performanceYear.ToDictionary(_ => _.Key, _ => 0m);
                agent.GroupBy(_ => _.ApprovalDate.Month)
                    .Select(_ => new
                    {
                        Month = _.FirstOrDefault().ApprovalDate.Month,
                        Approvals = _.Sum(approvals => approvals.Units)
                    }).ToList().ForEach(item => {
                        approvalsPerMonth[new DateTime(year, item.Month, 1).ToString(Configurations.MonthFormat)] = item.Approvals;
                    });

                var agentRankMetric = new AgentPerformanceMetric()
                {
                    Rank = rank++,
                    Key = agent.FirstOrDefault().Agent,
                    Value = agent.Sum(_ => _.Units),
                    Performance = approvalsPerMonth.Select(_ => new ApprovalMetric<string> { Key = _.Key, Value = _.Value })
                };

                result.Add(agentRankMetric);
            }

            return result;
        }

        public IEnumerable<BankAmountBreakdown> GetBankAmountBreakdown(int year, int month)
        {
            var banks = this.QueryReference(Domain.Enums.ReferenceTypeEnum.Bank).Select(_ => new { _.ReferenceId, _.Description });
            var cardCategories = this.QueryReference(Domain.Enums.ReferenceTypeEnum.CardCategory).Select(_ => new { _.ReferenceId, _.Description });
            var query = this.QueryApprovalTransactionsByYearMonth(year, month)
                .GroupBy(_ => new { _.BankId, _.CardCategoryId, _.Amount })
                .Select(_ => new
                {
                    BankId = _.FirstOrDefault().BankId,
                    CardCategoryId = _.FirstOrDefault().CardCategoryId,
                    Amount = _.FirstOrDefault().Amount,
                    Approvals = _.Sum(approvals => approvals.Units)
                }).ToList();

            var result = new List<BankAmountBreakdown>();
            foreach (var bank in banks)
            {
                var cardCategoryAmountBreakdown = new List<AmountBreakdown>();
                foreach (var cardCategory in cardCategories)
                {
                    var approvalsByAmount = query
                        .Where(q => q.BankId == bank.ReferenceId)
                        .Where(q => q.CardCategoryId == cardCategory.ReferenceId)
                        .Where(q => q.Approvals > 0)
                        .Where(q => q.Amount > 0)
                        .OrderBy(q => q.Amount)
                        .Select(q => new ApprovalMetric<decimal> {
                            Key = q.Amount,
                            Value = q.Approvals
                        });

                    var amountBreakdown = new AmountBreakdown
                    {
                        Description = cardCategory.Description,
                        ApprovalsByAmount = approvalsByAmount
                    };

                    cardCategoryAmountBreakdown.Add(amountBreakdown);
                }

                var item = new BankAmountBreakdown
                {
                    Description = bank.Description,
                    CardCategoryAmountBreakdown = cardCategoryAmountBreakdown
                };

                result.Add(item);
            }

            return result;
        }
    }
}
