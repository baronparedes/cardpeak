using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF
{
    public sealed class UserRepository : Repository<User>, IUserRepository
    {
        private readonly CardPeakDbContext DomainContext;
        public UserRepository(CardPeakDbContext context) : base(context)
        {
            this.DomainContext = context;
        }
    }
}
