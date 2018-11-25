﻿using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
	public interface IReferenceRepository : IRepository<Reference>
	{
		IEnumerable<Reference> GetBanks();
		IEnumerable<Reference> GetCardCategories();
		IEnumerable<Reference> GetDefaultRateTypes();
		Reference GetCardCategoryByShortDescription(string code);
	}
}
