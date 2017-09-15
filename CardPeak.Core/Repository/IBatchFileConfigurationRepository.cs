using CardPeak.Domain;

namespace CardPeak.Core.Repository
{
    public interface IBatchFileConfigurationRepository : IRepository<BatchFileConfiguration>
    {
        BatchFileConfiguration FindByBankId(int bankId);
        BatchFileConfiguration Save(BatchFileConfiguration batchFileConfiguration);
    }
}
