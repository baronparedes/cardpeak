using CardPeak.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using CardPeak.Core.Repository;

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

        public Dashboard GetDashboard()
        {
            return this.GetDashboard(DateTime.Now.Year, DateTime.Now.Month);
        }

        public Dashboard GetDashboard(int year, int month)
        {
            //var startDate = new DateTime(year, month, 1);
            //var endDate = new DateTime(year, month, 1).AddMonths(1).AddDays(-1);
            var result = new Dashboard
            {
                LatestProcessedBatch = this.BatchUploadRepository.GetLatestProcessed(),
                ApprovalsByBank = this.ApprovalTransactionRepository.GetApprovalsByBank(year, month),
                ApprovalsByCategory = this.ApprovalTransactionRepository.GetApprovalsByCategory(year, month),
                AccountBalance = this.ApprovalTransactionRepository.GetAccountBalance(year, month) 
                    + this.DebitCreditTransactionRepository.GetAccountBalance(year, month),
                TotalApprovals = this.ApprovalTransactionRepository.GetTotalApprovals(year, month),
                Performance = null
            };

            return result;
        }
    }
}
