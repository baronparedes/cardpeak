using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
	public interface ITeamDashboardService : IUnitOfWork
	{
		TeamDashboard GetDashboard(int teamId, int? year);
		TeamDashboardDetail AddAgent(int teamId, int agentId, bool isUnitManager, int performanceYear);
		bool RemoveAgent(int teamId, int agentId);
		Team CreateTeam(string teamName, string description);
		bool RemoveTeam(int teamId);
		IEnumerable<Team> GetTeams();
	}
}
