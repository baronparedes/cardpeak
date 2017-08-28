using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Service.Interfaces
{
    public interface IAgentService : IUnitOfWork
    {
        IEnumerable<Agent> GetAllAgents();
        AgentDashboard GetAgentDashboard(int agentId, DateTime startDate, DateTime? endDate);
        DebitCreditTransaction AddDebitCreditTransaction(int agentId, decimal amount, string remarks, bool isDebit);
        Agent Update(Agent agent);
    }
}
