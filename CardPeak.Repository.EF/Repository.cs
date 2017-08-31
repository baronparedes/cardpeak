using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Repository.EF
{
    public abstract class Repository<TEntity, TDBContext> : IRepository<TEntity> 
        where TEntity : class
        where TDBContext : DbContext
    {
        protected readonly TDBContext Context;

        public Repository(TDBContext context)
        {
            this.Context = context;
        }

        public virtual TEntity Get(int id)
        {
            return this.Context.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return this.Context.Set<TEntity>().ToList();
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Context.Set<TEntity>().Where(predicate);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Context.Set<TEntity>().SingleOrDefault(predicate);
        }

        public void Add(TEntity entity)
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
