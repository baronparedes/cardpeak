using CardPeak.Core.Processor;
using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CardPeak.Service
{
    public sealed class BatchService : UnitOfWork, IBatchService
    {
        private const string UnrecognizedFileErrorMessage = "Unrecognized file";

        private IProcessor Processor;
        private IReferenceRepository ReferenceRepository;
        private IBatchUploadRepository BatchUploadRepository;
        private IProcessorService ProcessorService;
        private IBatchFileConfigurationRepository BatchFileConfigurationRepository;
        private IApprovalTransactionRepository ApprovalTransactionRepository;
        private IDebitCreditTransactionRepository DebitCreditTransactionRepository;

        public BatchService(CardPeakDbContext context) : base(context)
        {
            this.ReferenceRepository = new ReferenceRepository(context);
            this.BatchUploadRepository = new BatchUploadRepository(context);
            this.ProcessorService = new ProcessorService(context);
            this.BatchFileConfigurationRepository = new BatchFileConfigurationRepository(context);
            this.ApprovalTransactionRepository = new ApprovalTransactionRepository(context);
            this.DebitCreditTransactionRepository = new DebitCreditTransactionRepository(context);
            this.Processor = new CardPeak.Processor.Excel.Processor(this.ProcessorService);
        }

        private Reference GetBankByFileName(FileInfo file)
        {
            var fileName = Path.GetFileNameWithoutExtension(file.FullName);
            var bank = this.ReferenceRepository
                .Find(_ => fileName.ToLower().Contains(_.Description.ToLower()) && 
                    _.ReferenceTypeId == (int)Domain.Enums.ReferenceTypeEnum.Bank)
                .FirstOrDefault();

            if (bank == null)
            {
                throw new Exception(BatchService.UnrecognizedFileErrorMessage);
            }

            return bank;
        }

        public BatchUpload CreateBatch(FileInfo file)
        {
            var batch = new BatchUpload
            {
                BankId = this.GetBankByFileName(file).ReferenceId,
                FileName = file.FullName
            };

            this.BatchUploadRepository.Add(batch);
            this.Complete();

            return batch;
        }

        public ProcessedBatchUpload Process(int id)
        {
            IEnumerable<ProcessedApprovalTransaction> processedApprovalTransactions = null;
            var batch = this.BatchUploadRepository.Get(id);
            var config = this.BatchFileConfigurationRepository.FindByBankId(batch.BankId);
            this.BatchUploadRepository.StartBatchProcess(batch);
            this.Complete();

            try
            {
                processedApprovalTransactions = this.Processor.Process(new FileInfo(batch.FileName), batch, config);
                batch.HasErrors = processedApprovalTransactions.Any(_ => _.HasErrors);
                batch.ProcessedRecords = processedApprovalTransactions.Select(_ => _.Row).Distinct().Count();
                if (!batch.HasErrors.Value)
                {
                    foreach (var item in processedApprovalTransactions)
                    {
                        this.ApprovalTransactionRepository.Add(item.ApprovalTransaction);
                        if (item.SavingsTransaction != null)
                        {
                            this.DebitCreditTransactionRepository.Add(item.SavingsTransaction);
                        }
                    }
                }
            }
            catch(Exception)
            {
                batch.HasErrors = true;
                throw;
            }
            finally
            {
                this.BatchUploadRepository.EndBatchProcess(batch);
                this.Complete();
            }

            return new ProcessedBatchUpload
            {
                Batch = batch,
                ProcessedApprovalTransactions = processedApprovalTransactions
            };
        }

        public BatchFileConfiguration GetBatchFileConfiguration(int bankId)
        {
            return this.BatchFileConfigurationRepository.FindByBankId(bankId);
        }

        public BatchFileConfiguration SaveBatchFileConfiguration(BatchFileConfiguration batchFileConfiguration)
        {
            var result = this.BatchFileConfigurationRepository.Save(batchFileConfiguration);
            this.Complete();
            return result;
        }

        public IEnumerable<BatchUpload> GetProcessedBatchUploads(DateTime startDate, DateTime? endDate)
        {
            return this.BatchUploadRepository.GetProcessedBatchUploads(startDate, endDate);
        }

        public bool Delete(int id)
        {
            var result = this.BatchUploadRepository.DeleteBatchUpload(id);
            if (result)
            {
                this.Complete();
            }
            return result;
        }
    }
}
