using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class UsersController : BaseController<IUserRepository, User, int>
    {
        public UsersController(IUserRepository repository) : base(repository)
        {
        }
    }
}
