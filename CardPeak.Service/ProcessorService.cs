using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;

namespace CardPeak.Service
{
    public sealed class ProcessorService : UnitOfWork, IProcessorService
    {
        private IAccountRepository AccountRepository;
        private IReferenceRepository ReferenceRepository;
        private IRateRepository RateRepository;

        public ProcessorService(CardPeakDbContext context) : base(context)
        {
            this.AccountRepository = new AccountRepository(context);
            this.ReferenceRepository = new ReferenceRepository(context);
            this.RateRepository = new RateRepository(context);
        }

        public decimal ComputeAmountAllocation(int agentId, int agentCount, int cardCategoryId, int bankId)
        {
            var rate = this.RateRepository.GetRate(agentId, cardCategoryId, bankId);
            if (rate == null)
            {
                throw new ArgumentNullException("Rate for this agent was not found.");
            }

            return rate.Amount / agentCount;
        }

        public void ComputeTransactionAmount(int agentCount, ref ProcessedApprovalTransaction item)
        {
            var rate = this.RateRepository.GetRate(item.Transaction.AgentId, item.Transaction.CardCategoryId, item.Transaction.BankId);
            if (rate == null)
            {
                throw new ArgumentNullException("Rate for this agent was not found.");
            }

            if (rate.SavingsAmount > 0)
            {
                var processId = Guid.NewGuid();
                item.Transaction.Amount = (rate.Amount / agentCount) - rate.SavingsAmount;
                item.Transaction.ProcessId = processId;
                item.SavingsTransaction = new DebitCreditTransaction
                {
                    Agent = null,
                    TransactionType = null,
                    AgentId = item.Transaction.AgentId,
                    Amount = rate.SavingsAmount,
                    TransactionDateTime = DateTime.Now,
                    TransactionTypeId = (int)Domain.Enums.TransactionTypeEnum.SavingsTransaction,
                    Remarks = string.Format("Auto-generated. BatchId: {0}, ProcessId: {1}", item.Transaction.BatchId, processId)
                };
            }
            else
            {
                item.Transaction.Amount = (rate.Amount / agentCount);
                item.SavingsTransaction = null;
            }

        }

        public IEnumerable<Account> GetAgentsByAlias(string alias)
        {
            return this.AccountRepository.FindByAlias(alias);
        }

        public Reference GetCardCategoryByCode(string code)
        {
            var codes = CardCategory.Codes;
            var description = codes[code.ToUpper()];
            return this.ReferenceRepository.GetCardCategoryByDescription(description);
        }
    }
}