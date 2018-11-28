using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Linq;

namespace CardPeak.Repository.EF
{
	public sealed class TeamRepository : RepositoryBase<Team, CardPeakDbContext>, ITeamRepository
	{
		public TeamRepository(CardPeakDbContext context) : base(context)
		{
		}

		public bool Delete(int id)
		{
			try
			{
				var entity = this.Context.Teams.Single(_ => _.TeamId == id);
				this.Remove(entity);
			}
			catch
			{
				return false;
			}

			return true;
		}
	}
}
