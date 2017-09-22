using CardPeak.Domain;
using System.IO;

namespace CardPeak.Core.Service
{
    public interface IBatchService : IUnitOfWork
    {
        BatchUpload CreateBatch(FileInfo file);
        ProcessedBatchUpload Process(int id);
        BatchFileConfiguration GetBatchFileConfiguration(int bankId);
        BatchFileConfiguration SaveBatchFileConfiguration(BatchFileConfiguration batchFileConfiguration);
    }
}
