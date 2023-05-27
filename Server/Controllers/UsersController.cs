using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

                await _repository.UpdateUser(profile);
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
