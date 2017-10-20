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
        private IApprovalTransactionAgentRepository ApprovalTransactionAgentRepository;
        private IDebitCreditTransactionRepository DebitCreditTransactionRepository;

        private string GenerateAgentDashboardTransactionRemarks(ApprovalTransaction approvalTransaction)
        {
            return string.Format("{0} - {1} - {2} - {3}", 
                approvalTransaction.Bank.Description, 
                approvalTransaction.CardCategory.Description, 
                approvalTransaction.ProductType, 
                approvalTransaction.Client);
        }

        private IEnumerable<AgentDashboardTransaction> GenerateAgentDashboardTransactions(
            IEnumerable<ApprovalTransaction> approvalTransactions, 
            IEnumerable<DebitCreditTransaction> debitCreditTransactions,
            decimal startingRunningBalance)
        {
            var transactions = debitCreditTransactions
                .Select(_ => new AgentDashboardTransaction
                {
                    TransactionId = _.Id,
                    TransactionType = (int)Domain.Enums.TransactionTypeEnum.DebitCreditTransaction,
                    TransactionAmount = _.Amount,
                    TransactionDate = _.TransactionDateTime,
                    Details = _.Remarks,
                    CreatedDate = _.CreatedDate
                });

            transactions = transactions.Union(approvalTransactions
                .Select(_ => new AgentDashboardTransaction
                {
                    TransactionId = _.Id,
                    TransactionType = (int)Domain.Enums.TransactionTypeEnum.ApprovalTransaction,
                    TransactionAmount = _.Amount,
                    TransactionDate = _.ApprovalDate,
                    Details = this.GenerateAgentDashboardTransactionRemarks(_),
                    CreatedDate = _.CreatedDate
                }));

            var result = transactions.OrderByDescending(_ => _.CreatedDate).ToList();
            var balance = startingRunningBalance
                + result.Sum(_ => _.TransactionAmount);
            foreach (var transaction in result)
            {
                transaction.RunningBalance = balance;
                balance = balance - transaction.TransactionAmount;
            }

            return result;
        }

        public AgentService(CardPeakDbContext context) 
            : base(context)
        {
            this.AgentRepository = new AgentRepository(context);
            this.AccountRepository = new AccountRepository(context);
            this.ApprovalTransactionAgentRepository = new ApprovalTransactionAgentRepository(context);
            this.DebitCreditTransactionRepository = new DebitCreditTransactionRepository(context);
        }

        public IEnumerable<Agent> GetAllAgents()
        {
            return this.AgentRepository.GetAllOrderedByName();
        }

        public AgentDashboard GetAgentDashboard(int agentId, DateTime startDate, DateTime? endDate = null)
        {
            var approvalTransactions = this.ApprovalTransactionAgentRepository.FindByAgent(agentId, startDate, endDate);
            var debitCreditTransactions = this.DebitCreditTransactionRepository.FindByAgent(agentId, startDate, endDate);
            var startingBalance = this.ApprovalTransactionAgentRepository.GetAgentAccountBalance(agentId, startDate) +
                    this.DebitCreditTransactionRepository.GetAgentAccountBalance(agentId, startDate);
            var agentDashboardTransactions = this.GenerateAgentDashboardTransactions(approvalTransactions, debitCreditTransactions, startingBalance);

            return new AgentDashboard
            {
                Agent = this.AgentRepository.Find(_ => _.AgentId == agentId).SingleOrDefault(),
                Accounts = this.AccountRepository.FindByAgent(agentId),
                ApprovalTransactions = approvalTransactions,
                DebitCreditTransactions = debitCreditTransactions,
                AgentDashboardTransactions = agentDashboardTransactions,
                AccountBalance = this.ApprovalTransactionAgentRepository.GetAgentAccountBalance(agentId) + 
                    this.DebitCreditTransactionRepository.GetAgentAccountBalance(agentId),
                SavingsBalance = this.DebitCreditTransactionRepository.GetAgentSavingsBalance(agentId),
                TotalApprovals = this.ApprovalTransactionAgentRepository.GetAgentTotalApprovals(agentId, startDate, endDate),
                Performance = this.ApprovalTransactionAgentRepository.GetAgentPerformance(agentId),
                ApprovalsByBank = this.ApprovalTransactionAgentRepository.GetAgentApprovalsByBank(agentId, startDate, endDate),
                ApprovalsByCategory = this.ApprovalTransactionAgentRepository.GetAgentApprovalsByCategory(agentId, startDate, endDate),
                ApprovalsByBankDetails = this.ApprovalTransactionAgentRepository.GetAgentApprovalsByBankDetails(agentId, startDate, endDate)
            };
        }

        public DebitCreditTransaction AddDebitCreditTransaction(int agentId, decimal amount, string remarks, bool isDebit)
        {
            try
            {
                if (amount <= 0)
                {
                    throw new ArgumentNullException("Amount cannot be 0 or less.");
                }

                var transactionAmount = (isDebit) ? Math.Abs(amount) * -1 : Math.Abs(amount);
                var transaction = new DebitCreditTransaction
                {
                    AgentId = agentId,
                    Remarks = remarks,
                    TransactionDateTime = DateTime.Now,
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

        public AgentPayout GetAgentPayouts()
        {
            return this.AgentRepository.GetAgentPayouts();
        }

        public void DeactivateAgent(int agentId)
        {
            this.AgentRepository.DeactivateAgent(agentId);
            this.Complete();
        }
    }
}
