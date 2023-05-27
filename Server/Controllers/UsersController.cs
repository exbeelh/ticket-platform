using System.Net;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = "Admin,User,Event Organizer")]
    public class UsersController : BaseController<IUserRepository, User, int>
    {
        public UsersController(IUserRepository repository) : base(repository)
        {
        }

        [HttpPut("UpdateUser/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] ProfileVM profile)
        {
            try
            {
                if (!await _repository.IsExist(id))
                {
                    return NotFound(new
                    {
                        code = StatusCodes.Status404NotFound,
                        status = HttpStatusCode.NotFound.ToString(),
                        message = $"Data with id {id} not found."
                    });
                }

                var result = await _repository.UpdateUser(profile);

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
