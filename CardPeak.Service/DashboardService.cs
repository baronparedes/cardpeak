using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Service
{
    public sealed class DashboardService : UnitOfWork, IDashboardService
    {
        private IBatchUploadRepository BatchUploadRepository;
        private IApprovalTransactionDashboardRepository ApprovalTransactionDashboardRepository;
        private IDebitCreditTransactionRepository DebitCreditTransactionRepository;

        public DashboardService(CardPeakDbContext context) : base(context)
        {
            this.BatchUploadRepository = new BatchUploadRepository(context);
            this.ApprovalTransactionDashboardRepository = new ApprovalTransactionDashboardRepository(context);
            this.DebitCreditTransactionRepository = new DebitCreditTransactionRepository(context);
        }

        public IEnumerable<ApprovalMetric<int>> GetAvailableYears()
        {
            return this.ApprovalTransactionDashboardRepository.GetAvailableYears();
        }

        public Dashboard GetDashboard(int? year = null, int? month = null)
        {
            year = year ?? DateTime.Now.Year;
            month = month ?? 0;

            var agents = this.ApprovalTransactionDashboardRepository.GetTopAgents(year.Value, month.Value);
            var result = new Dashboard
            {
                LatestProcessedBatch = this.BatchUploadRepository.GetLatestProcessed(),
                ApprovalsByBank = this.ApprovalTransactionDashboardRepository.GetApprovalsByBank(year.Value, month.Value),
                ApprovalsByCategory = this.ApprovalTransactionDashboardRepository.GetApprovalsByCategory(year.Value, month.Value),
                AccountBalance = this.ApprovalTransactionDashboardRepository.GetAccountBalance(year.Value, month.Value)
                    + this.DebitCreditTransactionRepository.GetAccountBalance(year.Value, month.Value),
                SavingsBalance = this.DebitCreditTransactionRepository.GetSavingsBalance(year.Value, month.Value),
                TotalApprovals = this.ApprovalTransactionDashboardRepository.GetTotalApprovals(year.Value, month.Value),
                Performance = this.ApprovalTransactionDashboardRepository.GetYearlyPerformance(year.Value),
                TopAgents = agents.Take(Configurations.TopAgentCount),
                AllAgents = agents,
                ApprovalsByBankDetails = this.ApprovalTransactionDashboardRepository.GetApprovalsByBankDetails(year.Value, month.Value),
                AvailableYears = this.ApprovalTransactionDashboardRepository.GetAvailableYears()
            };

            return result;
        }
    }
}