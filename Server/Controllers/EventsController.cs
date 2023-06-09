﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Data;
using Server.Repository.Interface;
using Server.ViewModels;
using System.Net;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Event Organizer")]
    public class EventsController : BaseController<IEventRepository, Event, int>
    {
        public EventsController(IEventRepository repository) : base(repository)
        {
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public override async Task<IActionResult> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    data = new
                    {
                        message = "Data Not Found!"
                    }
                });
            }

            entity.Views++;
            await _repository.UpdateAsync(entity);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpGet("Search")]
        [AllowAnonymous]
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
        [AllowAnonymous]
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

        [HttpGet("Featured")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<EventVM>>> Featured()
        {
            var entity = await _repository.Featured();
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });

        }

        [HttpGet("Detail/{slug}")]
        [AllowAnonymous]
        public async Task<ActionResult> Details(string slug)
        {
            var entity = await _repository.Detail(slug);

            if (entity == null)
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    message = "Data Not Found!"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpGet("Category/{id}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
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
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
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

        [HttpPost("Request")]
        [Consumes("multipart/form-data")]
        [Authorize(Roles = "Event Organizer")]
        public async Task<ActionResult> RequestEvent([FromForm] RequestEventVM requestEventVM)
        {
            var entity = await _repository.RequestEvent(requestEventVM);
            if (entity > 0)
            {
                return Ok(new
                {
                    code = StatusCodes.Status200OK,
                    status = HttpStatusCode.OK.ToString(),
                    data = "Request Event Success!"
                });
            }
            else
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    message = "Request Event Failed!"
                });
            }
        }

        [HttpGet("ListEventOrganizer/{userId}")]
        [Authorize(Roles = "Event Organizer")]
        public async Task<ActionResult> ListEventOrganizer(int userId)
        {
            var entity = await _repository.GetByUserOrganizerId(userId);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }
    }
}
