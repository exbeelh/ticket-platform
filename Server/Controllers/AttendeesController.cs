using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;
using System.Net;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeesController : BaseController<IAttendeeRepository, Attendee, int>
    {
        public AttendeesController(IAttendeeRepository repository) : base(repository)
        {
        }

        [HttpGet("OrderTickets/{id}")]
        public async Task<ActionResult> OrderTickets(int id)
        {
            var entity = await _repository.OrderTickets(id);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }
    }
}
