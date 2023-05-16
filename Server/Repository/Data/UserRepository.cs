using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class UserRepository : GeneralRepository<User, int, DbTicketPlatformContext>, IUserRepository
    {
        public UserRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
