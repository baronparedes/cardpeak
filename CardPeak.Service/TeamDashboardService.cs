using CardPeak.Core.Repository;
using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Service
{
	public sealed class TeamDashboardService : UnitOfWork, ITeamDashboardService
	{
		private ITeamPlacementRepository TeamPlacementRepository { get; set; }
		private ITeamRepository TeamRepository { get; set; }
		private IApprovalTransactionAgentRepository ApprovalAgentRepository { get; set; }
		private IApprovalTransactionDashboardRepository ApprovalTransactionDashboardRepository { get; set; }
		private IMetricsRepository MetricsRepository { get; set; }

		public TeamDashboardService(CardPeakDbContext context) : base(context)
		{
			this.TeamPlacementRepository = new TeamPlacementRepository(context);
			this.TeamRepository = new TeamRepository(context);
			this.ApprovalAgentRepository = new ApprovalTransactionAgentRepository(context);
			this.ApprovalTransactionDashboardRepository = new ApprovalTransactionDashboardRepository(context);
			this.MetricsRepository = new MetricsRepository(context);
		}

		private IEnumerable<TeamDashboardDetail> GetDashboardDetails(int year, int teamId)
		{
			var details = this.MetricsRepository.GetTeamPerformanceDetails(year, teamId)
				.OrderBy(_ => _.TeamPlacement.Agent.FirstName + " " + _.TeamPlacement.Agent.LastName);
			return details;
		}

		private int? AddAgent(int teamId, int agentId, bool isUnitManager)
		{
			if (this.TeamPlacementRepository.Exists(teamId, agentId))
			{
				return null;
			}

			var teamPlacement = new TeamPlacement
			{
				TeamId = teamId,
				AgentId = agentId,
				IsUnitManager = isUnitManager
			};

			this.TeamPlacementRepository.Add(teamPlacement);
			this.Complete();

			return teamPlacement.TeamPlacementId;
		}

		public TeamDashboardDetail AddAgent(int teamId, int agentId, bool isUnitManager, int performanceYear)
		{
			var id = this.AddAgent(teamId, agentId, isUnitManager);
			if (id == null)
			{
				return null;
			}

			var teamPlacement = this.TeamPlacementRepository.Get(id.Value);
			var performance = this.ApprovalAgentRepository.GetAgentPerformance(agentId, performanceYear);
			var detail = new TeamDashboardDetail
			{
				TeamPlacement = teamPlacement,
				Performance = performance,
				TotalApprovals = performance == null ? 0 : performance.Sum(p => p.Value)
			};

			return detail;
		}

		public TeamDashboard GetDashboard(int teamId, int? year = null)
		{
			year = year ?? DateTime.Now.Year;
			var team = this.TeamRepository.Get(teamId);
			if (team == null)
			{
				return null;
			}

			var availableYears = this.ApprovalTransactionDashboardRepository.GetAvailableYearsByTeam(teamId);

			var dashboard = new TeamDashboard
			{
				Team = team,
				Details = this.GetDashboardDetails(year.GetValueOrDefault(), teamId),
				Performance = this.ApprovalAgentRepository.GetTeamPerformance(teamId, year.GetValueOrDefault()),
				AvailableYears = availableYears,
				TotalApprovals = availableYears
					.Where(_ => _.Key == year.GetValueOrDefault())
					.FirstOrDefault()?.Value ?? 0m
			};

			return dashboard;
		}

		public IEnumerable<Team> GetTeams()
		{
			return this.TeamRepository.GetAll()
				.OrderBy(_ => _.Name);
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

		public Team SaveTeam(Team team)
		{
			this.TeamRepository.Upsert(team.TeamId, team);
			this.Complete();
			return team;
		}
	}
}
