using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Metrics;
using CardPeak.Repository.EF.Core;
using System;
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

		public Agent Update(Agent agent, List<Account> accounts, List<TeamPlacement> teams)
		{
            this.UpdateAccounts(agent, accounts);
            this.UpdateTeams(agent, teams);

            agent.TeamPlacements = null;
			agent.Accounts = null;
			this.Context.Entry(agent).State = EntityState.Modified;

			return agent;
		}

        public override void Add(Agent entity)
        {
            if (entity.TeamPlacements != null)
            {
                foreach (var item in entity.TeamPlacements)
                {
                    this.Context.Entry(item.Team).State = EntityState.Unchanged;
                }
            }
            base.Add(entity);
        }

        public void UpdateTeams(Agent agent, List<TeamPlacement> teams)
        {
            teams.ForEach(_ =>
            {
                var item = agent.TeamPlacements.FirstOrDefault(team => team.TeamId == _.TeamId);
                if (item == null)
                {
                    _.Team = null;
                    this.Context.Entry(_).State = EntityState.Deleted;
                }
            });

            var newTeams = agent.TeamPlacements.ToList();
            newTeams.ForEach(_ =>
            {
                var item = teams.FirstOrDefault(team => team.TeamId == _.TeamId);
                _.Team = null;
                if (item == null)
                {
                    this.Context.Entry(_).State = EntityState.Added;
                }
            });
        }

        public void UpdateAccounts(Agent agent, List<Account> accounts)
        {
            accounts.ForEach(_ =>
            {
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
            newAccounts.ForEach(_ =>
            {
                var item = accounts.FirstOrDefault(account => account.Alias.ToLower() == _.Alias.ToLower());
                if (item == null)
                {
                    this.Context.Entry(_).State = EntityState.Added;
                }
            });
        }

		public AgentPayoutTransaction GetAgentPayoutsV2()
		{
			var query = this.Context.AgentPayout
				.Select(_ => new
				{
					_.AgentId,
					_.FirstName,
					_.LastName,
					_.Payout
				}).ToList();

			var payouts = query.Select(_ => new ApprovalMetric<Agent>
			{
				Key = new Agent
				{
					AgentId = _.AgentId,
					FirstName = _.FirstName,
					LastName = _.LastName
				},
				Value = _.Payout.GetValueOrDefault()
			}).ToList();

			return new AgentPayoutTransaction
			{
				Payouts = payouts
			};
		}

        [Obsolete("Use GetAgentPayoutsV2 instead")]
        public AgentPayoutTransaction GetAgentPayoutsV1()
		{
			var approvalTransactions = this.Context.ApprovalTransactions
				.Include(_ => _.Agent)
				.Where(_ => !_.Agent.IsDeleted)
				.Where(_ => !_.IsDeleted)
				.GroupBy(_ => new { _.AgentId, _.Agent })
				.Select(_ => new
				{
					AgentId = _.FirstOrDefault().AgentId,
					Agent = _.FirstOrDefault().Agent,
					Amount = _.Sum(t => t.Amount)
				});

			var creditDebitTransactions = this.Context.DebitCreditTransactions
				.Include(_ => _.Agent)
				.Where(_ => !_.Agent.IsDeleted)
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
				.Select(_ => new
				{
					AgentId = _.FirstOrDefault().AgentId,
					Agent = _.FirstOrDefault().Agent,
					Amount = _.Sum(t => t.Amount)
				})
				.Where(_ => _.Amount > 0);


			var payouts = query.Select(_ => new ApprovalMetric<Agent>
			{
				Key = _.Agent,
				Value = _.Amount
			}).ToList();

			return new AgentPayoutTransaction
			{
				Payouts = payouts
			};
		}

		public AgentPayoutTransaction GetAgentPayouts()
		{
			return this.GetAgentPayoutsV2();
		}

		public void DeactivateAgent(int agentId)
		{
			var agent = this.Context.Agents.Single(_ => _.AgentId == agentId);
			agent.IsDeleted = true;
			this.Context.Entry(agent).State = EntityState.Modified;
		}
	}
}
