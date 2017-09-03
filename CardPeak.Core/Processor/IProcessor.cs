using CardPeak.Domain;
using System.Collections.Generic;
using System.IO;

namespace CardPeak.Core.Processor
{
    public interface IProcessor
    {
        IEnumerable<ProcessedApprovalTransaction> Process(FileInfo file, BatchUpload batch, BatchUploadConfiguration config);
    }
}
