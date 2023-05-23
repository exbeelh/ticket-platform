using Server.Models;

namespace Server.Repository.Interface
{
    public interface IAccountRoleRepository : IGeneralRepository<AccountRole, int>
    {
        Task<IEnumerable<string>> GetRolesByIdAsync(int id);
    }
}
