using CardPeak.Domain;

namespace CardPeak.Core.Repository
{
	public interface ITeamRepository : IRepository<Team>
	{
		bool Delete(int id);
	}
}