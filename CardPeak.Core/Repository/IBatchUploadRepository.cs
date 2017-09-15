using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IBatchUploadRepository : IRepository<BatchUpload>
    {
        void StartBatchProcess(BatchUpload batch);
        void EndBatchProcess(BatchUpload batch);
        IEnumerable<BatchUpload> GetLatestProcessed();
    }
}
