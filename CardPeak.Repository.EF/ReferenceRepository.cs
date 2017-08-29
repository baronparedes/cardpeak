using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF
{
    public sealed class ReferenceRepository : Repository<Reference, CardPeakDbContext>, IReferenceRepository
    {
        public ReferenceRepository(CardPeakDbContext context) : base(context)
        {
        }

        public IEnumerable<Reference> GetBanks()
        {
            return this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)CardPeak.Domain.Enums.ReferenceTypeEnum.Bank)
                .OrderBy(_ => _.Description)
                .ToList();
        }

        public IEnumerable<Reference> GetCardCategories()
        {
            return this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)CardPeak.Domain.Enums.ReferenceTypeEnum.CardCategory)
                .OrderBy(_ => _.Description)
                .ToList();
        }
    }
}
