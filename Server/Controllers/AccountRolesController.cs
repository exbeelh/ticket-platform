using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountRolesController : BaseController<IAccountRoleRepository, AccountRole, int>
    {
        public AccountRolesController(IAccountRoleRepository repository) : base(repository)
        {
        }
    }
}
