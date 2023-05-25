using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : BaseController<ITicketRepository, Ticket, int>
    {
        public TicketsController(ITicketRepository repository) : base(repository)
        {
        }

        [HttpGet("Total/{eventId}")]
        public async Task<IActionResult> Total(int eventId)
        {
            var totalTicketsSold = await _repository.Total(eventId);
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = totalTicketsSold
            });
        }

        [HttpGet("Event/{eventId}")]
        public async Task<IActionResult> GetByEventId(int eventId)
        {
            var data = await _repository.GetByEventId(eventId);
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = data
            });
        }
    }
}
