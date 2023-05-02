﻿using CardPeak.Core.Processor;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;

namespace CardPeak.Processor.Excel
{
    public sealed class Processor : IProcessor
    {
        private const string DefaultEmptyColumnPrefix = "Column";
        private const string InvalidConfigurationErrorMessageFormat = "No configuration for {0} has been found.";
        private const string ParseErrorMessageFormat = "Error parsing the value '{0}' for column {1}.";
        private const string InvalidConfiguratioNotFoundErrorMessageFormat = "No configuration has been found for {0}.";
        private const string NoAccountsFoundErrorMessageFormat = "Accounts were not found for the alias '{0}'.";
        private const string RateNotFoundErrorMessageFormat = "Unable to find any rates for '{0}'. [{1}, {2}]";
        private const string FullNameFormat = "{0}, {1} {2}";
        private const string AutoGeneratedRemarksFormat = "[auto-generated] from BatchId: '{0}', RateId:{1}, DefaultRate:{2}, Type:{3}";
        private const string ComputingErrorMessageFormat = "Error computing amount: {0}";
        private const string TransactionExistsErrorMessageFormat = "This transaction already exists on {0}'s account.";
        private const string BatchDuplicateErrorMessage = "This transaction has duplicates in this batch.";
        private const string DateParseErrorMessageFormat = "Error parsing the value '{0}' using DateTimeFormat of {1}";

        private IProcessorService ProcessorService;

        public Processor(IProcessorService service)
        {
            this.ProcessorService = service;
        }

        private void SetError(ProcessedApprovalTransaction transaction, string columnName, string value)
        {
            this.SetError(transaction, string.Format(Processor.ParseErrorMessageFormat, value, columnName));
        }

        private void SetError(ProcessedApprovalTransaction transaction, string errorMessage)
        {
            transaction.HasErrors = true;
            transaction.ErrorMessages.Add(errorMessage);
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

        private void GetColumn(DataRow item, int? configurationColumn, string columnName, Dictionary<string, string> fields)
        {
            try
            {
                fields.Add(columnName, item[configurationColumn.Value].ToString().Trim());
            }
            catch
            {
                fields.Add(columnName, null);
            }
        }

        private bool RowIsEmpty(Dictionary<string, string> fields)
        {
            if (fields == null)
            {
                return true;
            }
            return fields.All(_ => string.IsNullOrEmpty(_.Value));
        }

        private Dictionary<string, string> ToDataDictionary(DataRow item, BatchFileConfiguration configuration)
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

        private ProcessedApprovalTransaction ToProcessedApprovalTransaction(Dictionary<string, string> fields, BatchUpload batch, int rowNumber, string dateTimeFormat)
        {
            var result = new ProcessedApprovalTransaction
            {
                Row = rowNumber,
                Alias = fields[ApprovalFileFields.Alias],
                HasErrors = false,
                ErrorMessages = new List<string>(),
                ValidApproval = true,
                ApprovalTransaction = new ApprovalTransaction
                {
                    ReferenceNumber1 = fields[ApprovalFileFields.Ref1],
                    ReferenceNumber2 = fields[ApprovalFileFields.Ref2],
                    BankId = batch.BankId,
                    Bank = batch.Bank,
                    BatchId = batch.BatchId,
                    AgentId = 0,
                    Units = 0,
                    Amount = 0
                }
            };

            if (string.IsNullOrEmpty(fields[ApprovalFileFields.Alias]))
            {
                this.SetError(result, ApprovalFileFields.Alias, fields[ApprovalFileFields.Alias]);
            }

            if (string.IsNullOrEmpty(fields[ApprovalFileFields.CardCategory]))
            {
                this.SetError(result, ApprovalFileFields.CardCategory, fields[ApprovalFileFields.CardCategory]);
            }
            else
            {
                try
                {
                    var cardCategory = this.ProcessorService.GetCardCategoryByCode(fields[ApprovalFileFields.CardCategory]);
                    if (cardCategory != null)
                    {
                        result.ApprovalTransaction.CardCategoryId = cardCategory.ReferenceId;
                        result.ApprovalTransaction.CardCategory = cardCategory;
                    }
                    else
                    {
                        this.SetError(result, ApprovalFileFields.CardCategory, fields[ApprovalFileFields.CardCategory]);
                    }
                }
                catch
                {
                    this.SetError(result, ApprovalFileFields.CardCategory, fields[ApprovalFileFields.CardCategory]);
                }
            }

            try
            {
                var cultureInfo = CultureInfo.CurrentCulture;
                var dateString = fields[ApprovalFileFields.ApprovalDate];
                var formats = new[] { dateTimeFormat }
                    .Union(cultureInfo.DateTimeFormat.GetAllDateTimePatterns()).ToArray();
                var approvalDate = DateTime.ParseExact(dateString, formats, cultureInfo, DateTimeStyles.AssumeLocal);
                result.ApprovalTransaction.ApprovalDate = approvalDate;
            }
            catch (Exception ex)
            {
                this.SetError(result, ex.Message);
                this.SetError(result, string.Format(Processor.DateParseErrorMessageFormat, fields[ApprovalFileFields.ApprovalDate], dateTimeFormat));
                this.SetError(result, ApprovalFileFields.ApprovalDate, fields[ApprovalFileFields.ApprovalDate]);
            }

            result.ApprovalTransaction.Client = this.GetClientName(fields);
            if (string.IsNullOrEmpty(result.ApprovalTransaction.Client))
            {
                this.SetError(result, ApprovalFileFields.ClientFullName, fields[ApprovalFileFields.ClientFullName]);
            }

            result.ApprovalTransaction.ProductType = fields[ApprovalFileFields.ProductType];
            if (string.IsNullOrEmpty(result.ApprovalTransaction.ProductType))
            {
                this.SetError(result, ApprovalFileFields.ProductType, fields[ApprovalFileFields.ProductType]);
            }

            if (int.TryParse(fields[ApprovalFileFields.CardCount], out int cardCount))
            {
                result.ValidApproval = cardCount == 0;
            }

            return result;
        }

        private List<ProcessedApprovalTransaction> ProcessItem(ProcessedApprovalTransaction transaction)
        {
            var accounts = this.ProcessorService.GetAgentsByAlias(transaction.Alias);
            if (accounts.Count() == 0)
            {
                transaction.HasErrors = true;
                transaction.ErrorMessages.Add(string.Format(Processor.NoAccountsFoundErrorMessageFormat, transaction.Alias ?? string.Empty));
            }

            if (transaction.HasErrors)
            {
                return new List<ProcessedApprovalTransaction> { transaction };
            }

            return this.SplitTransactions(transaction, accounts);
        }

        private List<ProcessedApprovalTransaction> SplitTransactions(ProcessedApprovalTransaction transaction, IEnumerable<Account> accounts)
        {
            var result = new List<ProcessedApprovalTransaction>();
            var agentCount = accounts.Count();
            decimal splitUnits = transaction.ValidApproval ? (1.0m / agentCount) : 0m;
            foreach (var account in accounts)
            {
                var agentFullname = string.Format(Processor.FullNameFormat,
                    account.Agent.LastName,
                    account.Agent.FirstName,
                    account.Agent.MiddleName ?? string.Empty).Trim();

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

                        var rate = this.ProcessorService.GetAgentRate(
                            splitTransaction.ApprovalTransaction.AgentId,
                            splitTransaction.ApprovalTransaction.CardCategoryId,
                            splitTransaction.ApprovalTransaction.BankId,
                            account.Agent.AgentType);

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
                            var transactionId = Guid.NewGuid();
                            splitTransaction.ApprovalTransaction.Amount = (rate.Amount / agentCount) - rate.SavingsAmount;
                            splitTransaction.ApprovalTransaction.TransactionId = transactionId;
                            splitTransaction.SavingsTransaction = new DebitCreditTransaction
                            {
                                Agent = null,
                                TransactionType = null,
                                AgentId = splitTransaction.ApprovalTransaction.AgentId,
                                BatchId = splitTransaction.ApprovalTransaction.BatchId,
                                Amount = rate.SavingsAmount,
                                TransactionDateTime = DateTime.Now,
                                TransactionTypeId = (int)Domain.Enums.TransactionTypeEnum.SavingsTransaction,
                                Remarks = string.Format(Processor.AutoGeneratedRemarksFormat, transaction.ApprovalTransaction.BatchId, rate.RateId, rate.IsDefault, rate.TypeId),
                                TransactionId = transactionId
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

        private ExcelDataSetConfiguration GetDataSetConfiguration(BatchFileConfiguration configuration)
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

        private IEnumerable<ProcessedApprovalTransaction> ProcessItems(List<ProcessedApprovalTransaction> convertedExcelData)
        {
            if (convertedExcelData.Any(_ => _.HasErrors))
            {
                return convertedExcelData;
            }

            var hashSet = new HashSet<ApprovalTransaction>();
            foreach (var item in convertedExcelData)
            {
                if (hashSet.Any(_ => _.Equals(item.ApprovalTransaction)))
                {
                    item.HasErrors = true;
                    item.ErrorMessages.Add(Processor.BatchDuplicateErrorMessage);
                }
                else
                {
                    hashSet.Add(item.ApprovalTransaction);
                }
            }

            if (convertedExcelData.Any(_ => _.HasErrors))
            {
                return convertedExcelData;
            }

            var result = new List<ProcessedApprovalTransaction>();
            foreach (var transaction in convertedExcelData)
            {
                result.AddRange(this.ProcessItem(transaction));
            }

            return result;
        }

        public IEnumerable<ProcessedApprovalTransaction> Process(FileInfo file, BatchUpload batch, BatchFileConfiguration configuration)
        {
            if (!File.Exists(file.FullName))
            {
                throw new FileNotFoundException(string.Format(Processor.ParseErrorMessageFormat, Path.GetFileName(file.FullName)));
            }

            if (configuration.BatchFileConfigurationId == 0)
            {
                throw new ArgumentException(
                    string.Format(Processor.InvalidConfiguratioNotFoundErrorMessageFormat, batch.Bank.Description));
            }

            var convertedExcelData = new List<ProcessedApprovalTransaction>();

            using (var stream = File.Open(file.FullName, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var rowNumber = 0;
                    var dataSet = reader.AsDataSet(this.GetDataSetConfiguration(configuration));
                    var dataTable = dataSet.Tables[0];
                    foreach (var item in dataTable.Rows)
                    {
                        var dataDictionary = this.ToDataDictionary(item as DataRow, configuration);
                        if (this.RowIsEmpty(dataDictionary))
                        {
                            continue;
                        }

                        try
                        {
                            rowNumber++;
                            var transaction = this.ToProcessedApprovalTransaction(dataDictionary, batch, rowNumber, configuration.ApprovalDateFormat);
                            convertedExcelData.Add(transaction);
                        }
                        catch (Exception ex)
                        {
                            var transaction = new ProcessedApprovalTransaction
                            {
                                Row = rowNumber,
                                HasErrors = true,
                                ErrorMessages = new List<string> { ex.ToString(), dataDictionary.ToString() }
                            };
                            convertedExcelData.Add(transaction);
                        }
                    }
                }
            }

            return this.ProcessItems(convertedExcelData);
        }
    }
}