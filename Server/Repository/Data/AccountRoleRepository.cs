using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class AccountRoleRepository : GeneralRepository<AccountRole, int, MyContext>, IAccountRoleRepository
    {
        private readonly IRoleRepository _roleRepository;
        public AccountRoleRepository(MyContext context, IRoleRepository roleRepository) : base(context)
        {
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<string>> GetRolesByIdAsync(int id)
        {
            var getAccountRoleByAccountNik = GetAllAsync().Result.Where(x => x.AccountId == id);
            var getRole = await _roleRepository.GetAllAsync();

            var getRoleById = from ar in getAccountRoleByAccountNik
                               join r in getRole on ar.RoleId equals r.Id
                               select r.Name;

            return getRoleById;
        }
    }
}
