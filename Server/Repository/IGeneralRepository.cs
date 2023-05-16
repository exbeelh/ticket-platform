namespace Server.Repository;

public interface IGeneralRepository<TEntity, TKey> where TEntity : class
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(TKey key);
    Task<TEntity?> InsertAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TKey key);
    Task<bool> IsExist(TKey key);
}
