using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Repository.EF.Core;
using System.Collections.Generic;
using System.Linq;

namespace CardPeak.Repository.EF
{
	public sealed class ReferenceRepository : RepositoryBase<Reference, CardPeakDbContext>, IReferenceRepository
	{
		public ReferenceRepository(CardPeakDbContext context) : base(context)
		{
		}

		private IEnumerable<Reference> GetReference(Domain.Enums.ReferenceTypeEnum reference)
		{
			return this.Context.References
				.Where(_ => _.ReferenceTypeId == (int)reference)
				.OrderBy(_ => _.Description)
				.ToList();
		}

		public IEnumerable<Reference> GetBanks()
		{
			return this.GetReference(Domain.Enums.ReferenceTypeEnum.Bank);
		}

		public IEnumerable<Reference> GetCardCategories()
		{
			return this.GetReference(Domain.Enums.ReferenceTypeEnum.CardCategory);
		}

		public IEnumerable<Reference> GetDefaultRateTypes()
		{
			return this.GetReference(Domain.Enums.ReferenceTypeEnum.DefaultRate);
		}

		public Reference GetCardCategoryByShortDescription(string code)
		{
			return this.Context.References
				.Where(_ => _.ShortDescription.ToLower() == code.ToLower())
				.Where(_ => _.ReferenceTypeId == (int)CardPeak.Domain.Enums.ReferenceTypeEnum.CardCategory)
				.SingleOrDefault();
		}
	}
}
