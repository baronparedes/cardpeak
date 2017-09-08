using CardPeak.Core.Processor;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
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
        private const string DefaultEmptyColumnPrefix = "Column";
        private const string InvalidConfigurationErrorMessageFormat = "No configuration for {0} has been found.";
        private const string NotFoundErrorMessageFormat = "{0} not found.";
        private const string InvalidConfiguratioNotFoundErrorMessage = "No configuration has been found.";
        private const string NoAccountsFoundErrorMessageFormat = "Accounts were not found for the alias '{0}'";
        private IProcessorService Service;

        public Processor(IProcessorService service)
        {
            this.Service = service;
        }

        private void GetColumn(DataRow item, int? configurationColumn, string columnName, Dictionary<string, string> fields)
        {
            try
            {
                fields.Add(columnName, item[configurationColumn.Value].ToString());
            }
            catch
            {
                fields.Add(columnName, null);
            }
        }

        private Dictionary<string, string> ConvertItem(DataRow item, BatchFileConfiguration configuration)
        {
            var fields = new Dictionary<string, string>();
            this.GetColumn(item, configuration.AliasColumn, ApprovalFileFields.Alias, fields);
            this.GetColumn(item, configuration.CardCategoryColumn, ApprovalFileFields.CardCategory, fields);
            this.GetColumn(item, configuration.ProductTypeColumn, ApprovalFileFields.ProductType, fields);
            this.GetColumn(item, configuration.ApprovalDateColumn, ApprovalFileFields.ApprovalDate, fields);
            this.GetColumn(item, configuration.ClientFullNameColumn, ApprovalFileFields.ClientFullName, fields);
            this.GetColumn(item, configuration.ClientFirstNameColumn, ApprovalFileFields.ClientFirstName, fields);
            this.GetColumn(item, configuration.ClientMiddleNameColumn, ApprovalFileFields.ClientMiddleName, fields);
            this.GetColumn(item, configuration.ClientLastNameColumn, ApprovalFileFields.ClientLastName, fields);
            this.GetColumn(item, configuration.Ref1Column, ApprovalFileFields.Ref1, fields);
            this.GetColumn(item, configuration.Ref2Column, ApprovalFileFields.Ref2, fields);
            this.GetColumn(item, configuration.CardCountColumn, ApprovalFileFields.CardCount, fields);
            return fields;
        }

        private void SetError(ProcessedApprovalTransaction result, string columnName)
        {
            result.HasErrors = true;
            result.ErrorMessages.Add(string.Format(Processor.NotFoundErrorMessageFormat, columnName));
        }

        private ProcessedApprovalTransaction ConvertItem(Dictionary<string, string> fields)
        {
            var result = new ProcessedApprovalTransaction
            {
                HasErrors = false,
                ErrorMessages = new List<string>(),
                ValidApproval = true,
                Transaction = new ApprovalTransaction
                {
                    ReferenceNumber1 = fields[ApprovalFileFields.Ref1],
                    ReferenceNumber2 = fields[ApprovalFileFields.Ref2],
                }
            };

            if (string.IsNullOrEmpty(fields[ApprovalFileFields.Alias]))
            {
                this.SetError(result, ApprovalFileFields.Alias);
            }

            var cardCategory = this.Service.GetCardCategoryByCode(fields[ApprovalFileFields.CardCategory]);
            if (cardCategory != null)
            {
                result.Transaction.CardCategoryId = cardCategory.ReferenceId;
                result.Transaction.CardCategory = cardCategory;
            }
            else
            {
                this.SetError(result, ApprovalFileFields.CardCategory);
            }

            if (DateTime.TryParse(fields[ApprovalFileFields.ApprovalDate], out DateTime approvalDate))
            {
                result.Transaction.ApprovalDate = approvalDate;
            }
            else
            {
                this.SetError(result, ApprovalFileFields.ApprovalDate);
            }

            result.Transaction.Client = this.GetClientName(fields);
            if (string.IsNullOrEmpty(result.Transaction.Client))
            {
                this.SetError(result, ApprovalFileFields.ClientFullName);
            }

            result.Transaction.ProductType = fields[ApprovalFileFields.ProductType];
            if (string.IsNullOrEmpty(result.Transaction.ProductType))
            {
                this.SetError(result, ApprovalFileFields.ProductType);
            }

            if (int.TryParse(fields[ApprovalFileFields.CardCount], out int cardCount))
            {
                result.ValidApproval = cardCount == 0;
            }

            return result;
        }

        private string GetClientName(Dictionary<string, string> fields)
        {
            fields.TryGetValue(ApprovalFileFields.ClientFirstName, out string firstName);
            fields.TryGetValue(ApprovalFileFields.ClientMiddleName, out string middleName);
            fields.TryGetValue(ApprovalFileFields.ClientLastName, out string lastName);
            fields.TryGetValue(ApprovalFileFields.ClientFullName, out string fullName);

            if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName))
            {
                if (string.IsNullOrEmpty(fullName))
                {
                    return string.Empty;
                }
            }
            else
            {
                return string.Format("{0}, {1} {2}", lastName, firstName, middleName);
            }

            return fullName;
        }

        private List<ProcessedApprovalTransaction> ProcessItem(DataRow item, BatchUpload batch, BatchFileConfiguration configuration, int rowNumber)
        {
            var fields = this.ConvertItem(item, configuration);
            var result = this.ConvertItem(fields);
            var alias = fields[ApprovalFileFields.Alias];
            var accounts = this.Service.GetAgentsByAlias(alias);

            result.Row = rowNumber;
            result.Alias = alias;
            result.Transaction.BankId = batch.BankId;
            result.Transaction.BatchId = batch.BatchId;
            result.Transaction.AgentId = 0;
            result.Transaction.Units = 0;
            result.Transaction.Amount = 0;

            if (accounts.Count() == 0)
            {
                result.HasErrors = true;
                result.ErrorMessages.Add(string.Format(Processor.NoAccountsFoundErrorMessageFormat, fields[ApprovalFileFields.Alias] ?? string.Empty));
            }

            if (result.HasErrors)
            {
                return new List<ProcessedApprovalTransaction> { result };
            }

            return this.SplitTransactions(result, accounts);
        }

        private List<ProcessedApprovalTransaction> SplitTransactions(ProcessedApprovalTransaction item, IEnumerable<Account> accounts)
        {
            var result = new List<ProcessedApprovalTransaction>();
            decimal splitUnits = 1.0m / accounts.Count();
            foreach (var agent in accounts)
            {
                var transaction = new ProcessedApprovalTransaction
                {
                    Transaction = new ApprovalTransaction
                    {
                        ApprovalDate = item.Transaction.ApprovalDate,
                        BankId = item.Transaction.BankId,
                        Bank = item.Transaction.Bank,
                        CardCategory = item.Transaction.CardCategory,
                        CardCategoryId = item.Transaction.CardCategoryId,
                        Client = item.Transaction.Client,
                        BatchId = item.Transaction.BatchId,
                        ProductType = item.Transaction.ProductType,
                        ReferenceNumber1 = item.Transaction.ReferenceNumber1,
                        ReferenceNumber2 = item.Transaction.ReferenceNumber2
                    },
                    Row = item.Row,
                    Alias = item.Alias,
                    ErrorMessages = new List<string>(),
                    HasErrors = false,
                    ValidApproval = true
                };

                transaction.Transaction.AgentId = agent.AgentId;
                transaction.Transaction.Units = splitUnits;
                transaction.Transaction.Amount = 0;

                if (item.ValidApproval)
                {
                    try
                    {
                        transaction.Transaction.Amount = this.Service
                            .ComputeAmountAllocation(agent.AgentId, splitUnits, item.Transaction.CardCategoryId, item.Transaction.BankId);
                    }
                    catch (Exception ex)
                    {
                        item.HasErrors = true;
                        item.ErrorMessages.Add(string.Format("Error computing amount: {0}", ex.Message));
                    }
                }

                result.Add(transaction);
            }

            return result;
        }


        private void ValidateConfiguration(BatchFileConfiguration configuration)
        {
            if (configuration == null)
            {
                throw new ArgumentNullException(Processor.InvalidConfiguratioNotFoundErrorMessage);
            }
        }

        private ExcelDataSetConfiguration DataSetConfiguration(BatchFileConfiguration configuration)
        {
            var config = new ExcelDataSetConfiguration
            {
                ConfigureDataTable = (reader) => new ExcelDataTableConfiguration()
                {
                    EmptyColumnNamePrefix = Processor.DefaultEmptyColumnPrefix,
                    UseHeaderRow = configuration.HasHeader,
                    ReadHeaderRow = (rowReader) =>
                    {
                        for (int i = 0; i < configuration.SkipNumberOfRows.GetValueOrDefault(); i++)
                        {
                            rowReader.Read();
                        }
                    }
                }
            };

            return config;
        }

        public IEnumerable<ProcessedApprovalTransaction> Process(FileInfo file, BatchUpload batch, BatchFileConfiguration configuration)
        {
            if (!File.Exists(file.FullName))
            {
                throw new FileNotFoundException(string.Format(Processor.NotFoundErrorMessageFormat, Path.GetFileName(file.FullName)));
            }

            this.ValidateConfiguration(configuration);

            var result = new List<ProcessedApprovalTransaction>();
            var row = 0;

            using (var stream = File.Open(file.FullName, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var approvals = new List<ApprovalTransaction>();
                    var dataSet = reader.AsDataSet(this.DataSetConfiguration(configuration));
                    var dataTable = dataSet.Tables[0];
                    foreach (var item in dataTable.Rows)
                    {
                        row++;
                        result.AddRange(this.ProcessItem(item as DataRow, batch, configuration, row));
                    }
                }
            }

            return result;
        }
    }
}
