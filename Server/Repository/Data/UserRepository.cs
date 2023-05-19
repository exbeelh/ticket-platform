using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class UserRepository : GeneralRepository<User, int, MyContext>, IUserRepository
    {
        public UserRepository(MyContext context) : base(context)
        {
        }
    }
}
