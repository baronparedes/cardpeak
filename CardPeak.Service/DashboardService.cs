using CardPeak.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using CardPeak.Repository.EF;

namespace CardPeak.Service
{
    public sealed class DashboardService : UnitOfWork, IDashboardService
    {
        private IBatchService BatchService;

        public DashboardService(CardPeakDbContext context) : base(context)
        {
            this.BatchService = new BatchService(context);
        }

        public Dashboard GetDashboard()
        {
            return this.GetDashboard(DateTime.Now.Year, DateTime.Now.Month);
        }

        public Dashboard GetDashboard(int year, int month)
        {
            var startDate = new DateTime(year, month, 1);
            var endDate = new DateTime(year, month, 1).AddMonths(1).AddDays(-1);
            Console.WriteLine(startDate);
            Console.WriteLine(endDate);
            var result = new Dashboard
            {
                LatestProcessedBatch = this.BatchService.GetLatestProcessed()
            };

            return result;
        }
    }
}
