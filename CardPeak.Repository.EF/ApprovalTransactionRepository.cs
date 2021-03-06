﻿using CardPeak.Core.Repository;
using CardPeak.Domain;
using CardPeak.Domain.Constants;
using CardPeak.Repository.EF.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace CardPeak.Repository.EF
{
    public class ApprovalTransactionRepository : RepositoryBase<ApprovalTransaction, CardPeakDbContext>, IApprovalTransactionRepository
    {
        public ApprovalTransactionRepository(CardPeakDbContext context) : base(context) { }

        public bool Exists(ApprovalTransaction transaction)
        {
            return this.Context.ApprovalTransactions
                .Where(_ => _.BankId == transaction.BankId)
                .Where(_ => _.Client == transaction.Client)
                .Where(_ => !_.IsDeleted)
                .Any();
        }

        public IEnumerable<ApprovalTransaction> FindByClient(string client)
        {
            var result = this.Context.ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.Client.ToLower().Contains(client.ToLower()))
                .OrderBy(_ => _.Client)
                .Take(Configurations.MaxTransactionsQuery)
                .AsNoTracking();
            return result.ToList();
        }

        public IEnumerable<ApprovalTransaction> FindByBatch(int batchId)
        {
            var result = this.Context.ApprovalTransactions
                .Include(_ => _.Agent)
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(_ => _.BatchId == batchId)
                .OrderBy(_ => _.Client)
                .Take(Configurations.MaxTransactionsQuery)
                .AsNoTracking();
            return result.ToList();
        }

        public override IEnumerable<ApprovalTransaction> Find(Expression<Func<ApprovalTransaction, bool>> predicate)
        {
            return this.Context.Set<ApprovalTransaction>()
                .Include(_ => _.Bank)
                .Include(_ => _.CardCategory)
                .Where(_ => !_.IsDeleted)
                .Where(predicate);
        }

        public override void Add(ApprovalTransaction transaction)
        {
            this.Context.Entry(transaction).State = EntityState.Added;
            if (transaction.CardCategory != null)
            {
                this.Context.Entry(transaction.CardCategory).State = EntityState.Unchanged;
            }
            this.Context.ApprovalTransactions.Add(transaction);
        }

        protected IQueryable<Reference> QueryReference(Domain.Enums.ReferenceTypeEnum referenceType)
        {
            var query = this.Context.References
                .Where(_ => _.ReferenceTypeId == (int)referenceType)
                .OrderBy(_ => _.Description);

            return query;
        }

        public bool Delete(int id)
        {
            try
            {
                var transaction = this.Context.ApprovalTransactions.Single(_ => _.Id == id);
                if (transaction.TransactionId != null)
                {
                    var savings = this.Context.DebitCreditTransactions
                        .Single(_ => _.TransactionId == transaction.TransactionId);

                    savings.IsDeleted = true;
                    this.Context.Entry(savings).State = EntityState.Modified;
                }

                transaction.IsDeleted = true;
                this.Context.Entry(transaction).State = EntityState.Modified;
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
