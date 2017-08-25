﻿using CardPeak.Domain;
using CardPeak.Repository;
using CardPeak.Repository.EF;
using CardPeak.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                AccountBalance = this.ApprovalTransactionRepository.AccountBalanceByAgent(agentId) + this.DebitCreditTransactionRepository.AccountBalanceByAgent(agentId),
                SavingsBalance = this.DebitCreditTransactionRepository.SavingsBalanceByAgent(agentId),
                TotalApprovals = this.ApprovalTransactionRepository.TotalApprovalsByAgent(agentId),
                Performance = this.ApprovalTransactionRepository.GetAgentPerformance(agentId)
            };
        }

        public bool AddDebitCreditTransaction(int agentId, decimal amount, string remarks, bool isDebit)
        {
            try
            {
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
                this.DomainContext.SaveChanges();

                return true;
            }
            catch
            {
                // TODO: Log Errors
                return false;
            }
        }
    }
}
