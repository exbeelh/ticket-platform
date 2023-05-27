using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrganizersController : BaseController<IOrganizerRepository, Organizer, int>
    {
        public OrganizersController(IOrganizerRepository repository) : base(repository)
        {
        }

        [HttpGet("GetByUserId/{id}")]
        [Authorize(Roles = "Event Organizer")]
        public async Task<IActionResult> GetByUserId(int id)
        {
            var result = await _repository.GetByUserId(id);

            if (result == null)
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    message = "Data not found!"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = result
            });
        }

        [HttpPut("UpdateOrganizer/{id}")]
        [Consumes("multipart/form-data")]
        [Authorize(Roles = "Event Organizer")]
        public async Task<IActionResult> UpdateOrganizer(int id, [FromForm] OrganizerVM organizer)
        {
            try
            {
                var check = await _repository.GetByUserId(id);

                if (check == null)
                {
                    return NotFound(new
                    {
                        code = StatusCodes.Status404NotFound,
                        status = HttpStatusCode.NotFound.ToString(),
                        message = "Data not found!"
                    });
                }

                var result = await _repository.UpdateOrganizer(organizer);

                if (result == 0)
                {
                    return Conflict(new
                    {
                        code = StatusCodes.Status409Conflict,
                        status = HttpStatusCode.Conflict.ToString(),
                        message = "Data fail to update!"
                    });
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    message = "Internal server error"
                });
            }

            return NoContent();
        }
    }
}
