using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Repository
{
    public interface IReferenceRepository : IRepository<Reference>
    {
        IEnumerable<Reference> GetBanks();
        IEnumerable<Reference> GetCardCategories();
    }
}
