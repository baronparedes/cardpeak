using CardPeak.Core.Repository;
using CardPeak.Domain;
using System;
using System.Data.Entity;
using System.Linq;
using System.Collections.Generic;

namespace CardPeak.Repository.EF
{
    public sealed class BatchUploadRepository : Repository<BatchUpload, CardPeakDbContext>, IBatchUploadRepository
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
                .Where(_ => _.ProcessStartDateTime != null)
                .OrderByDescending(_ => _.BatchId)
                .Take(5)
                .ToList();
            return result;
        }
    }
}
