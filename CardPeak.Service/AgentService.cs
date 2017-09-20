using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Service
{
    public sealed class AgentService : UnitOfWork, IAgentService
    {
        private IAgentRepository AgentRepository;
        private IAccountRepository AccountRepository;
        private IApprovalTransactionRepository ApprovalTransactionRepository;
        private IDebitCreditTransactionRepository DebitCreditTransactionRepository;

        public AgentService(CardPeakDbContext context) 
            : base(context)
        {
            this.AgentRepository = new AgentRepository(context);
            this.AccountRepository = new AccountRepository(context);
            this.ApprovalTransactionRepository = new ApprovalTransactionRepository(context);
            this.DebitCreditTransactionRepository = new DebitCreditTransactionRepository(context);
        }

        public IEnumerable<Agent> GetAllAgents()
        {
            return this.AgentRepository.GetAllOrderedByName();
        }

        public AgentDashboard GetAgentDashboard(int agentId, DateTime startDate, DateTime? endDate = null)
        {
            return new AgentDashboard
            {
                Agent = this.AgentRepository.Find(_ => _.AgentId == agentId).SingleOrDefault(),
                Accounts = this.AccountRepository.FindByAgent(agentId),
                ApprovalTransactions = this.ApprovalTransactionRepository.FindByAgent(agentId, startDate, endDate),
                DebitCreditTransactions = this.DebitCreditTransactionRepository.FindByAgent(agentId, startDate, endDate),
                AccountBalance = this.ApprovalTransactionRepository.GetAgentAccountBalance(agentId) + this.DebitCreditTransactionRepository.GetAgentAccountBalance(agentId),
                SavingsBalance = this.DebitCreditTransactionRepository.GetAgentSavingsBalance(agentId),
                TotalApprovals = this.ApprovalTransactionRepository.GetAgentTotalApprovals(agentId),
                Performance = this.ApprovalTransactionRepository.GetAgentPerformance(agentId),
                ApprovalsByBank = this.ApprovalTransactionRepository.GetAgentApprovalsByBank(agentId, startDate, endDate),
                ApprovalsByCategory = this.ApprovalTransactionRepository.GetAgentApprovalsByCategory(agentId, startDate, endDate),
                ApprovalsByBankDetails = this.ApprovalTransactionRepository.GetAgentApprovalsByBankDetails(agentId, startDate, endDate)
            };
        }

        public DebitCreditTransaction AddDebitCreditTransaction(int agentId, decimal amount, string remarks, bool isDebit)
        {
            try
            {
                if (amount <= 0)
                {
                    throw new ArgumentNullException("Amount cannot be 0");
                }

                var transactionAmount = (isDebit) ? Math.Abs(amount) * -1 : Math.Abs(amount);
                var transaction = new DebitCreditTransaction
                {
                    AgentId = agentId,
                    Remarks = remarks,
                    TransactionDateTime = DateTime.Today,
                    TransactionTypeId = (int)CardPeak.Domain.Enums.TransactionTypeEnum.DebitCreditTransaction,
                    IsDeleted = false,
                    Amount = transactionAmount
                };

                this.DebitCreditTransactionRepository.Add(transaction);
                this.Complete();

                return transaction;
            }
            catch
            {
                // TODO: Log Errors
                return null;
            }
        }

        public Agent Update(Agent agent)
        {
            var accounts = this.AccountRepository.FindByAgent(agent.AgentId).ToList();
            this.AgentRepository.Update(agent, accounts);
            this.Complete();
            return agent;
        }

        public Agent Create(Agent agent)
        {
            this.AgentRepository.Add(agent);
            this.Complete();
            return agent;
        }

        public IEnumerable<Account> GetAccounts(int agentId)
        {
            return this.AccountRepository.FindByAgent(agentId);
        }
    }
}
