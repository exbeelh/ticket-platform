using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class RoleRepository : GeneralRepository<Role, int, DbTicketPlatformContext>, IRoleRepository
    {
        public RoleRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
