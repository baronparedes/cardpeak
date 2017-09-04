using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Service
{
    public interface IBatchService : IUnitOfWork
    {
        BatchUpload CreateBatch(FileInfo file);
        Task<ProcessedBatchUpload> ProcessAsync(int id);
    }
}
