using CardPeak.Domain;
using System.Collections.Generic;

namespace CardPeak.Core.Service
{
	public interface ISettingsService : IUnitOfWork
	{
		Settings GetSettings();
		Settings GetRates(int agentId);
		IEnumerable<Rate> SaveRates(int agentId, Settings settings);

		Settings GetDefaultRates(int typeId);
		IEnumerable<Rate> SaveDefaultRates(int typeId, Settings settings);
	}
}
