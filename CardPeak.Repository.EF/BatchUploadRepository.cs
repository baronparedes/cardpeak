using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Data.Entity;
using System.Linq;

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
    }
}
