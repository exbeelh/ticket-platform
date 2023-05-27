using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : BaseController<IRoleRepository, Role, int>
    {
        public RolesController(IRoleRepository repository) : base(repository)
        {
        }
    }
}
