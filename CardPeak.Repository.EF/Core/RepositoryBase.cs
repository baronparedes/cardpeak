using CardPeak.Core.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace CardPeak.Repository.EF.Core
{
    public abstract class RepositoryBase<TEntity, TDbContext> : ContextBase<TDbContext>, IRepository<TEntity> 
        where TEntity : class
        where TDbContext : DbContext
    {
        public RepositoryBase(TDbContext context) : base(context)
        {
        }

        public virtual TEntity Get(int id)
        {
            return this.Context.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return this.Context.Set<TEntity>()
                .AsNoTracking()
                .ToList();
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Context.Set<TEntity>()
                .AsNoTracking()
                .Where(predicate);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Context.Set<TEntity>()
                .AsNoTracking()
                .SingleOrDefault(predicate);
        }

        public virtual void Add(TEntity entity)
        {
            this.Context.Set<TEntity>().Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            this.Context.Set<TEntity>().AddRange(entities);
        }

        public void Remove(TEntity entity)
        {
            this.Context.Set<TEntity>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            this.Context.Set<TEntity>().RemoveRange(entities);
        }

        public TEntity Update(int id, TEntity entity)
        {
            var existingEntity = this.Get(id);
            if (existingEntity == null)
            {
                return null;
            }

            this.Context.Entry(existingEntity).CurrentValues.SetValues(entity);
            this.Context.Entry(existingEntity).State = EntityState.Modified;
            return existingEntity;
        }
    }

}
