using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
    public interface IAgentService : IUnitOfWork
    {
        IEnumerable<Agent> GetAllAgents();
        IEnumerable<Account> GetAccounts(int agentId);
        AgentDashboard GetAgentDashboard(int agentId, DateTime startDate, DateTime? endDate);
        DebitCreditTransaction AddDebitCreditTransaction(int agentId, decimal amount, string remarks, bool isDebit);
        Agent Update(Agent agent);
        Agent Create(Agent agent);
    }
}
