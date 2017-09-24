using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;

namespace CardPeak.Repository.EF
{
    public sealed class UserRepository : RepositoryBase<User, CardPeakDbContext>, IUserRepository
    {
        public UserRepository(CardPeakDbContext context) : base(context)
        {
        }
    }
}
