using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Data;
using Server.Repository.Interface;
using Server.ViewModel;
using System.Net;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : BaseController<IEventRepository, Event, int>
    {
        public EventsController(IEventRepository repository) : base(repository)
        {
        }

        [HttpGet("Search")]
        public async Task<IActionResult> GetAsync([FromQuery] string searchQuery)
        {
            var filteredEvents = await _repository.Search(searchQuery);
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = filteredEvents
            });
        }


        [HttpGet("Upcoming")]
        public async Task<ActionResult<IEnumerable<EventVM>>> Upcoming()
        {
            var entity = await _repository.Upcoming();
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpGet("Category/{id}")]
        public async Task<ActionResult> Category(int id)
        {
            var entity = await _repository.Category(id);
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpGet("Tickets/{id}")]
        public async Task<ActionResult> Ticket(int id)
        {
            var entity = await _repository.Ticket(id);
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpPut("Approve/{id}")]
        public async Task<ActionResult> Aprove(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    message = "Data Not Found!"
                });
            }

            entity.StatusId = 1;
            await _repository.UpdateAsync(entity);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = "Event has been Approved!"
            });
        }

        [HttpPut("Banned/{id}")]
        public async Task<ActionResult> Banned(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    message = "Data Not Found!"
                });
            }

            entity.StatusId = 2;
            await _repository.UpdateAsync(entity);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = "Event has been Banned!"
            });
        }

        [HttpGet("Approve")]
        public async Task<ActionResult<EventVM>> GetAllAprove()
        {
            var entity = await _repository.Aprove();

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpGet("Banned")]
        public async Task<ActionResult<EventVM>> GetAllBanned()
        {
            var entity = await _repository.Ban();

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }
    }
}
