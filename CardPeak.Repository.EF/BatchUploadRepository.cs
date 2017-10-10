using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Repository.EF.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class BatchUploadRepository : RepositoryBase<BatchUpload, CardPeakDbContext>, IBatchUploadRepository
    {
        public BatchUploadRepository(CardPeakDbContext context) : base(context)
        {
        }

        public override BatchUpload Get(int id)
        {
            return this.Context.BatchUploads
                .Include(_ => _.Bank)
                .Single(_ => _.BatchId == id);
        }

        public void StartBatchProcess(BatchUpload batch)
        {
            batch.ProcessStartDateTime = DateTime.Now;
            this.Context.Entry(batch.Bank).State = EntityState.Unchanged;
            this.Context.Entry(batch).State = EntityState.Modified;
        }

        public void EndBatchProcess(BatchUpload batch)
        {
            batch.ProcessEndDateTime = DateTime.Now;
            this.Context.Entry(batch.Bank).State = EntityState.Unchanged;
            this.Context.Entry(batch).State = EntityState.Modified;
        }

        public IEnumerable<BatchUpload> GetLatestProcessed()
        {
            var result = this.Context.BatchUploads
                .Include(_ => _.Bank)
                .Where(_ => _.ProcessEndDateTime != null)
                .Where(_ => !_.IsDeleted)
                .OrderByDescending(_ => _.ProcessEndDateTime)
                .Take(Configurations.LatestProcessedBatchCount)
                .ToList();

            return result;
        }

        public IEnumerable<BatchUpload> GetProcessedBatchUploads(DateTime startDate, DateTime? endDate)
        {
            var result = this.Context.BatchUploads
                .Include(_ => _.Bank)
                .Where(_ => _.ProcessEndDateTime != null)
                .Where(_ => _.HasErrors == false)
                .Where(_ => !_.IsDeleted)
                .Where(_ => DbFunctions.TruncateTime(_.ProcessStartDateTime) >= startDate.Date);

            if (endDate != null && startDate.Date <= endDate.Value.Date)
            {
                result = result
                    .Where(_ => DbFunctions.TruncateTime(_.ProcessStartDateTime) <= DbFunctions.TruncateTime(endDate.Value));
            }

            return result
                .OrderByDescending(_ => _.ProcessEndDateTime)
                .ToList();
        }

        public bool DeleteBatchUpload(int batchId)
        {
            try
            {
                //TODO: Move this into a stored procedure.
                var batch = this.Context.BatchUploads
                    .Single(_ => _.BatchId == batchId);

                var transactions = this.Context.ApprovalTransactions
                    .Where(_ => _.BatchId == batchId);

                var savings = this.Context.DebitCreditTransactions
                    .Where(_ => _.BatchId == batchId);

                foreach (var item in transactions)
                {
                    item.IsDeleted = true;
                    this.Context.Entry(item).State = EntityState.Modified;
                }

                foreach (var item in savings)
                {
                    item.IsDeleted = true;
                    this.Context.Entry(item).State = EntityState.Modified;
                }

                batch.IsDeleted = true;
                this.Context.Entry(batch).State = EntityState.Modified;

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
