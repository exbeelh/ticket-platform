using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "User,Event Organizer")]
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

        [HttpGet("List/{orderId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> List(int orderId)
        {
            var entity = await _repository.GetAttendeeByOrderId(orderId);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }
    }
}
