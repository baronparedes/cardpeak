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
        public IAgentRepository AgentRepository { get; private set; }

        public AgentService(CardPeakDbContext context) 
            : base(context)
        {
            this.AgentRepository = new AgentRepository(context);
        }

        public IEnumerable<Agent> GetAllAgents()
        {
            return this.AgentRepository.GetAll();
        }
    }
}
