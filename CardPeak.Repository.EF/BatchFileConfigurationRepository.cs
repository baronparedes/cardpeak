﻿using CardPeak.Core.Repository;
using CardPeak.Domain;
using System.Data.Entity;
using System.Linq;

namespace CardPeak.Repository.EF
{
    public sealed class BatchFileConfigurationRepository : Repository<BatchFileConfiguration, CardPeakDbContext>, IBatchFileConfigurationRepository
    {
        public BatchFileConfigurationRepository(CardPeakDbContext context) : base(context)
        {
        }

        public BatchFileConfiguration FindByBankId(int bankId)
        {
            var result = this.Context.BatchFileConfiguration
                .Include(_ => _.Bank)
                .SingleOrDefault(_ => _.BankId == bankId);

            if (result == null)
            {
                result = new BatchFileConfiguration
                {
                    BankId = bankId,
                    Bank = this.Context.References.Where(_ => _.ReferenceId == bankId).Single(),
                };
            }

            return result;
        }

        public BatchFileConfiguration Save(BatchFileConfiguration batchFileConfiguration)
        {
            if (batchFileConfiguration.BatchFileConfigurationId == 0)
            {
                this.Context.Entry(batchFileConfiguration).State = EntityState.Added;
                this.Context.BatchFileConfiguration.Add(batchFileConfiguration);
            }
            else
            {
                this.Context.Entry(batchFileConfiguration).State = EntityState.Modified;
            }

            return batchFileConfiguration;
        }
    }
}
