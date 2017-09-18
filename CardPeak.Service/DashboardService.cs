using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System;

namespace CardPeak.Service
{
    public sealed class DashboardService : UnitOfWork, IDashboardService
    {
        private IBatchUploadRepository BatchUploadRepository;
        private IApprovalTransactionRepository ApprovalTransactionRepository;
        private IDebitCreditTransactionRepository DebitCreditTransactionRepository;

        public DashboardService(CardPeakDbContext context) : base(context)
        {
            this.BatchUploadRepository = new BatchUploadRepository(context);
            this.ApprovalTransactionRepository = new ApprovalTransactionRepository(context);
            this.DebitCreditTransactionRepository = new DebitCreditTransactionRepository(context);
        }

        public Dashboard GetDashboard(int? year = null, int? month = null)
        {
            year = year ?? DateTime.Now.Year;
            month = month ?? DateTime.Now.Month;

            var result = new Dashboard
            {
                LatestProcessedBatch = this.BatchUploadRepository.GetLatestProcessed(),
                ApprovalsByBank = this.ApprovalTransactionRepository.GetApprovalsByBank(year.Value, month.Value),
                ApprovalsByCategory = this.ApprovalTransactionRepository.GetApprovalsByCategory(year.Value, month.Value),
                AccountBalance = this.ApprovalTransactionRepository.GetAccountBalance(year.Value, month.Value)
                    + this.DebitCreditTransactionRepository.GetAccountBalance(year.Value, month.Value),
                TotalApprovals = this.ApprovalTransactionRepository.GetTotalApprovals(year.Value, month.Value),
                Performance = this.ApprovalTransactionRepository.GetYearlyPerformance(year.Value),
                TopAgents = this.ApprovalTransactionRepository.GetTopAgents(year.Value, month.Value),
                ApprovalsByBankDetails = this.ApprovalTransactionRepository.GetApprovalsByBankDetails(year.Value, month.Value)
            };

            return result;
        }
    }
}
