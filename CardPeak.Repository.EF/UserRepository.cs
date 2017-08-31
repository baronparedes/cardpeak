using CardPeak.Core.Repository;
using CardPeak.Domain;

namespace CardPeak.Repository.EF
{
    public sealed class UserRepository : Repository<User, CardPeakDbContext>, IUserRepository
    {
        public UserRepository(CardPeakDbContext context) : base(context)
        {
        }
    }
}
