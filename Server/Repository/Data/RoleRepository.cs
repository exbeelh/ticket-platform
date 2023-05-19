using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class RoleRepository : GeneralRepository<Role, int, MyContext>, IRoleRepository
    {
        public RoleRepository(MyContext context) : base(context)
        {
        }
    }
}
