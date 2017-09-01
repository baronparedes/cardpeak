using CardPeak.Core.Processor;
using CardPeak.Core.Service;
using CardPeak.Domain;
using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;

namespace CardPeak.Processor.Excel
{
    public sealed class Processor : IProcessor
    {
        private IProcessorService Service;
        private BatchUpload Batch;
        private BatchUploadConfiguration BatchConfiguration;

        public Processor(IProcessorService service)
        {
            this.Service = service;
        }

        private ExcelDataSetConfiguration DataSetConfiguration()
        {
            var config = new ExcelDataSetConfiguration {
                ConfigureDataTable = (reader) => new ExcelDataTableConfiguration()
                {
                    EmptyColumnNamePrefix = "Column",
                    UseHeaderRow = this.BatchConfiguration.FirstRowIsHeader,
                    ReadHeaderRow = (rowReader) => {
                        rowReader.Read();
                    }
                }
            };
            
            return config;
        }

        private IEnumerable<ProcessedTransaction> ConvertItem(DataRow item)
        {
            var result = new List<ProcessedTransaction>();
            var alias = item[this.BatchConfiguration.AliasColumn.Value].ToString();
            var cardCategory = item[this.BatchConfiguration.CardCategoryColumn.Value].ToString();
            var product = item[this.BatchConfiguration.ProductColumn.Value].ToString();
            var accounts = this.Service.GetAgentsByAlias(alias);
            var units = 1 / accounts.Count();

            if (accounts.Count() == 0)
            {
                //TODO: Return Line Item Has errors;
            }

            foreach (var agent in accounts)
            {
                var transaction = new ProcessedTransaction();
                transaction.Transaction = new ApprovalTransaction
                {
                    AgentId = agent.AgentId
                    //TODO
                };

                result.Add(transaction);
            }

            return result;
        }

        private void ProcessItem(DataRow item, List<ApprovalTransaction> processed, List<ApprovalTransaction> errors)
        {
            var result = this.ConvertItem(item);
            processed.AddRange(result.Where(_ => _.HasErrors == false).Select(_ => _.Transaction));
            errors.AddRange(result.Where(_ => _.HasErrors).Select(_ => _.Transaction));
        }

        public ProcessedApprovalTransaction Process(FileInfo file, BatchUpload batch, BatchUploadConfiguration batchConfiguration)
        {
            if (!File.Exists(file.FullName))
            {
                throw new FileNotFoundException(string.Format("{0} not found.", Path.GetFileName(file.FullName)));
            }

            this.Batch = batch;
            this.BatchConfiguration = batchConfiguration;

            var processed = new List<ApprovalTransaction>();
            var errors = new List<ApprovalTransaction>();

            using (var stream = File.Open(file.FullName, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var approvals = new List<ApprovalTransaction>();
                    var dataSet = reader.AsDataSet(this.DataSetConfiguration());
                    var dataTable = dataSet.Tables[0];
                    foreach (var item in dataTable.Rows)
                    {
                        this.ProcessItem(item as DataRow, processed, errors);
                    }
                }
            }

            return new ProcessedApprovalTransaction
            {
                Processed = processed,
                Errors = errors
            };
        }
    }
}
