using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
	public sealed class TeamPlacementRepository : RepositoryBase<TeamPlacement, CardPeakDbContext>, ITeamPlacementRepository
	{
		public TeamPlacementRepository(CardPeakDbContext context) : base(context)
		{
		}

		public bool Delete(int teamId)
		{
			try
			{
				var entities = this.Context.TeamPlacements.Where(_ => _.TeamId == teamId);
				this.RemoveRange(entities);
			}
			catch
			{
				return false;
			}

			return true;
		}

		public bool Delete(int teamId, int agentId)
		{
			try
			{
				var entities = this.Context.TeamPlacements
					.Where(_ => _.AgentId == agentId)
					.Where(_ => _.TeamId == teamId);
				this.RemoveRange(entities);
			}
			catch
			{
				return false;
			}

			return true;
		}

		public IEnumerable<TeamPlacement> GetTeamMembers(int teamId)
		{
			return this.Context.TeamPlacements
				.Include(_ => _.Agent)
				.Include(_ => _.Team)
				.Where(_ => _.TeamId == teamId)
				.AsNoTracking()
				.ToList();
		}
	}
}
