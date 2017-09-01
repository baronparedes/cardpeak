using CardPeak.Domain;
using System.IO;

namespace CardPeak.Core.Processor
{
    public interface IProcessor
    {
        ProcessedApprovalTransaction Process(FileInfo file, BatchUpload batch, BatchUploadConfiguration config);
    }
}
