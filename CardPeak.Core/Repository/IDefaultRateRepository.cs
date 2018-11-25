using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
	public interface IDefaultRateRepository : IRepository<DefaultRate>
	{
		IEnumerable<Rate> GetRates(int typeId);
		Rate GetRate(int typeId, int cardCategoryId, int bankId);
		void SaveRates(int typeId, Settings settings);
	}
}
