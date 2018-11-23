﻿using CardPeak.Core.Repository;
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
		private readonly ITeamPlacementRepository TeamPlacementRepository;
		private readonly ITeamRepository TeamRepository;
		private readonly IApprovalTransactionAgentRepository ApprovalAgentRepository;
		private readonly IApprovalTransactionDashboardRepository ApprovalTransactionDashboardRepository;

		public TeamDashboardService(CardPeakDbContext context) : base(context)
		{
			this.TeamPlacementRepository = new TeamPlacementRepository(context);
			this.TeamRepository = new TeamRepository(context);
			this.ApprovalAgentRepository = new ApprovalTransactionAgentRepository(context);
			this.ApprovalTransactionDashboardRepository = new ApprovalTransactionDashboardRepository(context);
		}

		private IEnumerable<TeamDashboardDetail> GetDashboardDetails(int teamId, int year)
		{
			var details = new List<TeamDashboardDetail>();
			var teamPlacements = this.TeamPlacementRepository.GetTeamMembers(teamId).ToList();
			if (teamPlacements != null && teamPlacements.Count > 0)
			{
				teamPlacements.ForEach(_ =>
				{
					var performance = this.ApprovalAgentRepository.GetAgentPerformance(_.AgentId, year);
					var detail = new TeamDashboardDetail
					{
						TeamPlacement = _,
						Performance = performance,
						TotalApprovals = performance == null ? 0m : performance.Sum(p => p.Value)
					};
					details.Add(detail);
				});
			}

			return details;
		}

		public TeamDashboardDetail AddAgent(int teamId, int agentId, bool isUnitManager, int performanceYear)
		{
			var teamPlacement = new TeamPlacement
			{
				TeamId = teamId,
				AgentId = agentId,
				IsUnitManager = isUnitManager
			};

			this.TeamPlacementRepository.Add(teamPlacement);
			this.Complete();

			var performance = this.ApprovalAgentRepository.GetAgentPerformance(agentId, performanceYear);
			var detail = new TeamDashboardDetail
			{
				TeamPlacement = teamPlacement,
				Performance = performance,
				TotalApprovals = performance == null ? 0 : performance.Sum(p => p.Value)
			};

			return detail;
		}

		public Team CreateTeam(string teamName, string description)
		{
			var team = new Team { Name = teamName, Description = description };
			this.TeamRepository.Add(team);
			this.Complete();
			return team;
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
				Details = this.GetDashboardDetails(teamId, year.GetValueOrDefault()),
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
