using CardPeak.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardPeak.Domain;
using System.IO;
using CardPeak.Repository.EF;
using CardPeak.Repository;
using System.Data.Entity;

namespace CardPeak.Service
{
    public sealed class BatchService : UnitOfWork, IBatchService
    {
        private IReferenceRepository ReferenceRepository;
        private IBatchUploadRepository BatchUploadRepository;

        public BatchService(CardPeakDbContext context) : base(context)
        {
            this.ReferenceRepository = new ReferenceRepository(context);
            this.BatchUploadRepository = new BatchUploadRepository(context);
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

        public BatchUpload Process(int id)
        {
            var batch = this.BatchUploadRepository.Get(id);
            batch.ProcessStartDateTime = DateTime.Now;
            this.DomainContext.Entry(batch.Bank).State = EntityState.Unchanged;
            this.DomainContext.Entry(batch).State = EntityState.Modified;
            this.Complete();

            try
            {
                this.Process(batch);
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

        public void Process(BatchUpload batch)
        {
            System.Threading.Thread.Sleep(5000);
        }
    }
}
