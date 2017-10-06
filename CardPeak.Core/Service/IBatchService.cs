using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.IO;

namespace CardPeak.Core.Service
{
    public interface IBatchService : IUnitOfWork
    {
        BatchUpload CreateBatch(FileInfo file);
        ProcessedBatchUpload Process(int id);
        bool Delete(int id);
        BatchFileConfiguration GetBatchFileConfiguration(int bankId);
        BatchFileConfiguration SaveBatchFileConfiguration(BatchFileConfiguration batchFileConfiguration);
        IEnumerable<BatchUpload> GetProcessedBatchUploads(DateTime startDate, DateTime? endDate);
    }
}
