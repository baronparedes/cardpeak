using CardPeak.Domain;

namespace CardPeak.Core.Repository
{
    public interface IBatchUploadRepository : IRepository<BatchUpload>
    {
        void StartBatchProcess(BatchUpload batch);
        void EndBatchProcess(BatchUpload batch);
    }
}
