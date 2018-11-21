using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
	public interface ITeamPlacementRepository : IRepository<TeamPlacement>
	{
		IEnumerable<TeamPlacement> GetTeamMembers(int teamId);
		bool Delete(int teamId);
		bool Delete(int teamId, int agentId);
	}
}
