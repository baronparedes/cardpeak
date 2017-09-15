﻿using CardPeak.Domain;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CardPeak.Core.Service
{
    public interface IBatchService : IUnitOfWork
    {
        BatchUpload CreateBatch(FileInfo file);
        Task<ProcessedBatchUpload> ProcessAsync(int id);
        BatchFileConfiguration GetBatchFileConfiguration(int bankId);
        BatchFileConfiguration SaveBatchFileConfiguration(BatchFileConfiguration batchFileConfiguration);
        IEnumerable<BatchUpload> GetLatestProcessed();
    }
}
