using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class RolesController : BaseController<IRoleRepository, Role, int>
    {
        public RolesController(IRoleRepository repository) : base(repository)
        {
        }
    }
}
