using System.Collections.Generic;

namespace CardPeak.Domain
{
	public sealed class Settings
	{
		public IEnumerable<Reference> Banks { get; set; }
		public IEnumerable<Reference> CardCategories { get; set; }
		public IEnumerable<Reference> DefaultRateTypes { get; set; }
		public IEnumerable<Rate> Rates { get; set; }
		public int BankReferenceTypeId { get; set; }
		public int CardCategoryReferenceTypeId { get; set; }
		public int DefaultRateReferenceTypeId { get; set; }
	}
}
