using CardPeak.Domain;
using CardPeak.Repository;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Service
{
    public sealed class AgentService : UnitOfWork, IUnitOfWork
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
                SavingsBalance = this.DebitCreditTransactionRepository.SavingsBalanceByAgent(agentId)
            };
        }
    }
}
