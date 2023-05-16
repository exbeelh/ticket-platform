using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizersController : BaseController<IOrganizerRepositrory, Organizer, int>
    {
        public OrganizersController(IOrganizerRepositrory repository) : base(repository)
        {
        }
    }
}
