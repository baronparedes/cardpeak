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

        public BatchUploadConfiguration GetConfiguration(int bankId)
        {
            var batchConfig = new BatchUploadConfiguration();
            batchConfig.BankId = bankId;
            batchConfig.HasHeader = true;

            //METROBANK
            // =================================
            //batchConfig.Ref1Column = 0;
            //batchConfig.ApprovalDateColumn = 2;
            //batchConfig.ClientLastNameColumn = 3;
            //batchConfig.ClientFirstNameColumn = 4;
            //batchConfig.ClientMiddleNameColumn = 5;
            //batchConfig.ProductTypeColumn = 7;
            //batchConfig.CardCountColumn = 10;
            //batchConfig.AliasColumn = 11;
            //batchConfig.CardCategoryColumn = 13;
            // =================================

            batchConfig.SkipNumberOfRows = 2;
            batchConfig.Ref1Column = 1;
            batchConfig.Ref2Column = 2;
            batchConfig.ClientFullNameColumn = 3;
            batchConfig.ProductTypeColumn = 4;
            batchConfig.ApprovalDateColumn = 8;
            batchConfig.AliasColumn = 10;
            batchConfig.CardCategoryColumn = 12;

            return batchConfig;
        }
    }
}
