using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IAgentService : IUnitOfWork
    {
        IEnumerable<Agent> GetAllAgents();
        AgentDetails GetAgentDetails(int agentId);
        AgentDashboard GetAgentDashboard(int agentId, DateTime startDate, DateTime? endDate);
        AgentSavings GetAgentSavings(int agentId, int? year);
        DebitCreditTransaction AddDebitCreditTransaction(int agentId, decimal amount, string remarks, bool isDebit);
        DebitCreditTransaction AddIncentiveTransaction(int agentId, decimal amount, string remarks);
        DebitCreditTransaction AddDebitCreditSavingsTransaction(int agentId, decimal amount, string remarks, DateTime? transactionDate, bool isDebit);
        Agent Update(Agent agent);
        Agent Create(Agent agent);
        AgentPayoutTransaction GetAgentPayouts();
        void DeactivateAgent(int agentId);
    }
}
