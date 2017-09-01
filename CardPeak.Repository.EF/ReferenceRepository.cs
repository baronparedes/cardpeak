using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Collections.Generic;
using System.Linq;

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

        public Reference GetCardCategoryByDescription(string description)
        {
            return this.Context.References
                .Where(_ => _.Description.ToLower() == description.ToLower())
                .Where(_ => _.ReferenceTypeId == (int)CardPeak.Domain.Enums.ReferenceTypeEnum.CardCategory)
                .FirstOrDefault();
        }
    }
}
