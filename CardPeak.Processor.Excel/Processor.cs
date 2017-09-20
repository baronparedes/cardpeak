﻿using CardPeak.Core.Processor;
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
        private const string NoAccountsFoundErrorMessageFormat = "Accounts were not found for the alias '{0}'.";
        private const string RateNotFoundErrorMessageFormat = "Unable to find any rates for '{0}'. [{1}, {2}]";
        private const string FullNameFormat = "{0}, {1} {2}";
        private const string AutoGeneratedRemarksFormat = "[auto-generated] from BatchId: '{0}', ProcessId: {1}, RateId:{2}";
        private const string ComputingErrorMessageFormat = "Error computing amount: {0}";
        private const string TransactionExistsErrorMessageFormat = "This transaction already exists on {0}'s account.";

        private IProcessorService ProcessorService;

        public Processor(IProcessorService service)
        {
            this.ProcessorService = service;
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
                ApprovalTransaction = new ApprovalTransaction
                {
                    ReferenceNumber1 = fields[ApprovalFileFields.Ref1],
                    ReferenceNumber2 = fields[ApprovalFileFields.Ref2],
                }
            };

            if (string.IsNullOrEmpty(fields[ApprovalFileFields.Alias]))
            {
                this.SetError(result, ApprovalFileFields.Alias);
            }

            var cardCategory = this.ProcessorService.GetCardCategoryByCode(fields[ApprovalFileFields.CardCategory]);
            if (cardCategory != null)
            {
                result.ApprovalTransaction.CardCategoryId = cardCategory.ReferenceId;
                result.ApprovalTransaction.CardCategory = cardCategory;
            }
            else
            {
                this.SetError(result, ApprovalFileFields.CardCategory);
            }

            if (DateTime.TryParse(fields[ApprovalFileFields.ApprovalDate], out DateTime approvalDate))
            {
                result.ApprovalTransaction.ApprovalDate = approvalDate;
            }
            else
            {
                this.SetError(result, ApprovalFileFields.ApprovalDate);
            }

            result.ApprovalTransaction.Client = this.GetClientName(fields);
            if (string.IsNullOrEmpty(result.ApprovalTransaction.Client))
            {
                this.SetError(result, ApprovalFileFields.ClientFullName);
            }

            result.ApprovalTransaction.ProductType = fields[ApprovalFileFields.ProductType];
            if (string.IsNullOrEmpty(result.ApprovalTransaction.ProductType))
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
                return string.Format(Processor.FullNameFormat, lastName, firstName, middleName).Trim();
            }

            return fullName;
        }

        private List<ProcessedApprovalTransaction> ProcessItem(DataRow item, BatchUpload batch, BatchFileConfiguration configuration, int rowNumber)
        {
            var fields = this.ConvertItem(item, configuration);
            var result = this.ConvertItem(fields);
            var alias = fields[ApprovalFileFields.Alias];
            var accounts = this.ProcessorService.GetAgentsByAlias(alias);

            result.Row = rowNumber;
            result.Alias = alias;
            result.ApprovalTransaction.BankId = batch.BankId;
            result.ApprovalTransaction.Bank = batch.Bank;
            result.ApprovalTransaction.BatchId = batch.BatchId;
            result.ApprovalTransaction.AgentId = 0;
            result.ApprovalTransaction.Units = 0;
            result.ApprovalTransaction.Amount = 0;

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

        private List<ProcessedApprovalTransaction> SplitTransactions(ProcessedApprovalTransaction transaction, IEnumerable<Account> accounts)
        {
            var result = new List<ProcessedApprovalTransaction>();
            var agentCount = accounts.Count();
            decimal splitUnits = 1.0m / agentCount;
            foreach (var account in accounts)
            {
                var agentFullname = string.Format(Processor.FullNameFormat,
                    account.Agent.LastName,
                    account.Agent.FirstName,
                    account.Agent.MiddleName ?? "").Trim();

                var splitTransaction = new ProcessedApprovalTransaction
                {
                    ApprovalTransaction = new ApprovalTransaction
                    {
                        ApprovalDate = transaction.ApprovalTransaction.ApprovalDate,
                        BankId = transaction.ApprovalTransaction.BankId,
                        Bank = transaction.ApprovalTransaction.Bank,
                        CardCategory = transaction.ApprovalTransaction.CardCategory,
                        CardCategoryId = transaction.ApprovalTransaction.CardCategoryId,
                        Client = transaction.ApprovalTransaction.Client,
                        BatchId = transaction.ApprovalTransaction.BatchId,
                        ProductType = transaction.ApprovalTransaction.ProductType,
                        ReferenceNumber1 = transaction.ApprovalTransaction.ReferenceNumber1,
                        ReferenceNumber2 = transaction.ApprovalTransaction.ReferenceNumber2,
                        AgentId = account.AgentId,
                        Units = splitUnits,
                        Amount = 0
                    },
                    Row = transaction.Row,
                    Alias = transaction.Alias,
                    ErrorMessages = new List<string>(),
                    HasErrors = false,
                    ValidApproval = transaction.ValidApproval
                };

                if (splitTransaction.ValidApproval)
                {
                    try
                    {

                        if (this.ProcessorService.TransactionHasDuplicates(splitTransaction.ApprovalTransaction))
                        {
                            splitTransaction.HasErrors = true;
                            splitTransaction.ErrorMessages.Add(string.Format(Processor.TransactionExistsErrorMessageFormat, agentFullname));
                            result.Add(splitTransaction);
                            continue;
                        }

                        var rate = this.ProcessorService.GetRate(
                            transaction.ApprovalTransaction.AgentId, 
                            transaction.ApprovalTransaction.CardCategoryId, 
                            transaction.ApprovalTransaction.BankId);

                        if (rate == null)
                        {
                            splitTransaction.HasErrors = true;
                            splitTransaction.ErrorMessages.Add(string.Format(Processor.RateNotFoundErrorMessageFormat,
                                agentFullname,
                                splitTransaction.ApprovalTransaction.Bank.Description,
                                splitTransaction.ApprovalTransaction.CardCategory.Description));

                            result.Add(splitTransaction);
                            continue;
                        }

                        if (rate.SavingsAmount > 0)
                        {
                            var processId = Guid.NewGuid();
                            splitTransaction.ApprovalTransaction.Amount = (rate.Amount / agentCount) - rate.SavingsAmount;
                            splitTransaction.ApprovalTransaction.ProcessId = processId;
                            splitTransaction.SavingsTransaction = new DebitCreditTransaction
                            {
                                Agent = null,
                                TransactionType = null,
                                AgentId = splitTransaction.ApprovalTransaction.AgentId,
                                Amount = rate.SavingsAmount,
                                TransactionDateTime = DateTime.Now,
                                TransactionTypeId = (int)Domain.Enums.TransactionTypeEnum.SavingsTransaction,
                                Remarks = string.Format(Processor.AutoGeneratedRemarksFormat, transaction.ApprovalTransaction.BatchId, processId, rate.RateId)
                            };
                        }
                        else
                        {
                            splitTransaction.ApprovalTransaction.Amount = (rate.Amount / agentCount);
                            splitTransaction.SavingsTransaction = null;
                        }
                    }
                    catch (Exception ex)
                    {
                        splitTransaction.HasErrors = true;
                        splitTransaction.ErrorMessages.Add(string.Format(Processor.ComputingErrorMessageFormat, ex.Message));
                    }
                }

                result.Add(splitTransaction);
            }

            return result;
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

            if (configuration == null)
            {
                throw new ArgumentNullException(Processor.InvalidConfiguratioNotFoundErrorMessage);
            }

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
