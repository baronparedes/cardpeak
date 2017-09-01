using CardPeak.Core.Processor;
using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CardPeak.Service
{
    public sealed class BatchService : UnitOfWork, IBatchService
    {
        private IProcessor Processor;
        private IReferenceRepository ReferenceRepository;
        private IBatchUploadRepository BatchUploadRepository;
        private IProcessorService ProcessorService;

        public BatchService(CardPeakDbContext context) : base(context)
        {
            this.ReferenceRepository = new ReferenceRepository(context);
            this.BatchUploadRepository = new BatchUploadRepository(context);
            this.ProcessorService = new ProcessorService(context);

            this.Processor = new CardPeak.Processor.Excel.Processor(this.ProcessorService);
        }

        private Reference DetermineBank(FileInfo file)
        {
            var fileName = Path.GetFileNameWithoutExtension(file.FullName);
            var bank = this.ReferenceRepository
                .Find(_ => fileName.ToLower().Contains(_.Description.ToLower()) && 
                    _.ReferenceTypeId == (int)CardPeak.Domain.Enums.ReferenceTypeEnum.Bank)
                .FirstOrDefault();

            if (bank == null)
            {
                throw new Exception("Unrecognized file");
            }

            return bank;
        }

        public BatchUpload CreateBatch(FileInfo file)
        {
            var batch = new BatchUpload
            {
                BankId = this.DetermineBank(file).ReferenceId,
                FileName = file.FullName
            };

            this.BatchUploadRepository.Add(batch);
            this.Complete();

            return batch;
        }

        private BatchUploadConfiguration GetBankConfiguration(int bankId)
        {
            var batchConfig = new BatchUploadConfiguration();
            batchConfig.BankId = bankId;
            batchConfig.FirstRowIsHeader = true;
            batchConfig.Ref1Column = 0;
            batchConfig.ApprovalDateColumn = 2;
            batchConfig.ClientLastNameColumn = 3;
            batchConfig.ClientFirstNameColumn = 4;
            batchConfig.ClientMiddleNameColumn = 5;
            batchConfig.ProductColumn = 6;
            batchConfig.MultiplCardColumn = 8;
            batchConfig.AliasColumn = 9;
            batchConfig.AmountColumn = 10;
            batchConfig.CardCategoryColumn = 11;

            return batchConfig;
        }

        public async Task<BatchUpload> ProcessAsync(int id)
        {
            var batch = this.BatchUploadRepository.Get(id);
            batch.ProcessStartDateTime = DateTime.Now;
            this.DomainContext.Entry(batch.Bank).State = EntityState.Unchanged;
            this.DomainContext.Entry(batch).State = EntityState.Modified;
            this.Complete();

            try
            {
                await Task.Run(() => {
                    this.Processor.Process(new FileInfo(batch.FileName), batch, this.GetBankConfiguration(batch.BankId)); //TODO Fetch Config
                });
                batch.HasErrors = false;
            }
            catch(Exception)
            {
                batch.HasErrors = true;
                throw;
            }
            finally
            {
                batch.ProcessEndDateTime = DateTime.Now;
                this.DomainContext.Entry(batch.Bank).State = EntityState.Unchanged;
                this.DomainContext.Entry(batch).State = EntityState.Modified;
                this.Complete();
            }

            return batch;
        }
    }
}
