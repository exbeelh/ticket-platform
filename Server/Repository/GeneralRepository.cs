using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace Server.Repository;
public class GeneralRepository<TEntity, TKey, TContext> : IGeneralRepository<TEntity, TKey>
    where TEntity : class
    where TContext : DbTicketPlatformContext
{
    protected TContext _context;

    public GeneralRepository(TContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _context.Set<TEntity>().ToListAsync();

    }

    public async Task<TEntity?> GetByIdAsync(TKey key)
    {
        return await _context.Set<TEntity>().FindAsync(key);
    }

     public virtual async Task<TEntity?> InsertAsync(TEntity entity)
    {
        await _context.Set<TEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(TEntity entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TKey key)
    {
        var entity = await GetByIdAsync(key);
        _context.Set<TEntity>().Remove(entity!);
        await _context.SaveChangesAsync();
    }

    public virtual async Task<bool> IsExist(TKey key)
    {
        var entity = await GetByIdAsync(key);
        _context.ChangeTracker.Clear();
        return entity != null;
    }
}
