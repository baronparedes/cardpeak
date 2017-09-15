using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class AgentRepository : Repository<Agent, CardPeakDbContext>, IAgentRepository
    {
        public AgentRepository(CardPeakDbContext context) : base(context)
        {
        }

        public IEnumerable<Agent> GetAllOrderedByName()
        {
            return this.Context.Agents
                .Where(_ => !_.IsDeleted)
                .OrderBy(_ => _.FirstName).ThenBy(_ => _.LastName).ToList();
        }

        public Agent Update(Agent agent, List<Account> accounts)
        {
            accounts.ForEach(_ => {
                var item = agent.Accounts.FirstOrDefault(account => account.Alias.ToLower() == _.Alias.ToLower());
                if (item != null)
                {
                    _.Alias = item.Alias;
                    this.Context.Entry(_).State = EntityState.Modified;
                }
                else
                {
                    this.Context.Entry(_).State = EntityState.Deleted;
                }
            });

            var newAccounts = agent.Accounts.ToList();
            newAccounts.ForEach(_ => {
                var item = accounts.FirstOrDefault(account => account.Alias.ToLower() == _.Alias.ToLower());
                if (item == null)
                {
                    this.Context.Entry(_).State = EntityState.Added;
                }
            });

            agent.Accounts = null;
            this.Context.Entry(agent).State = EntityState.Modified;

            return agent;
        }
    }
}
