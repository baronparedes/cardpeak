using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
	public interface ITeamPlacementRepository : IRepository<TeamPlacement>
	{
		IEnumerable<TeamPlacement> GetTeamMembers(int teamId);
        IEnumerable<TeamPlacement> FindByAgent(int agentId);
        bool Exists(int teamId, int agentId);
		bool Delete(int teamId);
		bool Delete(int teamId, int agentId);
	}
}
