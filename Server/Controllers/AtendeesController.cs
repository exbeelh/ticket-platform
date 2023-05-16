using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtendeesController : BaseController<IAtendeeRepository, Atendee, int>
    {
        public AtendeesController(IAtendeeRepository repository) : base(repository)
        {
        }
    }
}
