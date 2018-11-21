using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System.Collections.Generic;

namespace CardPeak.Service
{
	public sealed class TeamPlacementService : UnitOfWork, ITeamPlacementService
	{
		private readonly ITeamPlacementRepository TeamPlacementRepository;
		private readonly ITeamRepository TeamRepository;

		public TeamPlacementService(CardPeakDbContext context) : base(context)
		{
			this.TeamPlacementRepository = new TeamPlacementRepository(context);
			this.TeamRepository = new TeamRepository(context);
		}

		public TeamPlacement AddAgent(int teamId, int agentId, bool isUnitManager)
		{
			var teamPlacement = new TeamPlacement
			{
				TeamId = teamId,
				AgentId = agentId,
				IsUnitManager = isUnitManager
			};

			this.TeamPlacementRepository.Add(teamPlacement);
			this.Complete();

			return teamPlacement;
		}

		public Team CreateTeam(string teamName, string description)
		{
			var team = new Team { Name = teamName, Description = description };
			this.TeamRepository.Add(team);
			this.Complete();
			return team;
		}

		public IEnumerable<TeamPlacement> GetTeamMembers(int teamId)
		{
			return this.TeamPlacementRepository.GetTeamMembers(teamId);
		}

		public IEnumerable<Team> GetTeams()
		{
			return this.TeamRepository.GetAll();
		}

		public bool RemoveAgent(int teamId, int agentId)
		{
			try
			{
				this.TeamPlacementRepository.Delete(teamId, agentId);
				this.Complete();
			}
			catch
			{
				// TODO: Log Error
				return false;
			}

			return true;
		}

		public bool RemoveTeam(int teamId)
		{
			try
			{
				this.TeamPlacementRepository.Delete(teamId);
				this.TeamRepository.Delete(teamId);
				this.Complete();
			}
			catch
			{
				// TODO: Log Error
				return false;
			}

			return true;
		}
	}
}
