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

        [HttpGet("OrderTickets/{eventId}")]
        public async Task<ActionResult> OrderTickets(int eventId)
        {
            var entity = await _repository.OrderTickets(eventId);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }
    }
}
