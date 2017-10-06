using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Metrics;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class AgentRepository : RepositoryBase<Agent, CardPeakDbContext>, IAgentRepository
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

        public AgentPayout GetAgentPayouts()
        {
            var approvalTransactions = this.Context.ApprovalTransactions
                .Include(_ => _.Agent)
                .Where(_ => !_.IsDeleted)
                .GroupBy(_ => new { _.AgentId, _.Agent })
                .Select(_ => new {
                    AgentId = _.FirstOrDefault().AgentId,
                    Agent = _.FirstOrDefault().Agent,
                    Amount = _.Sum(t => t.Amount)
                });

            var creditDebitTransactions = this.Context.DebitCreditTransactions
                .Include(_ => _.Agent)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.TransactionTypeId == (int)Domain.Enums.TransactionTypeEnum.DebitCreditTransaction)
                .GroupBy(_ => new { _.AgentId, _.Agent })
                .Select(_ => new
                {
                    AgentId = _.FirstOrDefault().AgentId,
                    Agent = _.FirstOrDefault().Agent,
                    Amount = _.Sum(t => t.Amount)
                });

            var query = approvalTransactions.Union(creditDebitTransactions)
                .GroupBy(_ => _.AgentId)
                .Select(_ => new {
                    AgentId = _.FirstOrDefault().AgentId,
                    Agent = _.FirstOrDefault().Agent,
                    Amount = _.Sum(t => t.Amount)
                })
                .Where(_ => _.Amount > 0);


            var payout = query.Select(_ => new ApprovalMetric<Agent> {
                Key = _.Agent,
                Value = _.Amount
            }).ToList();

            return new AgentPayout {
                Payouts = payout
            };
        }
    }
}
