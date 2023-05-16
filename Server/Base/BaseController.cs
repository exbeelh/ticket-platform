using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Repository;
using System.Net;

namespace Server.Base
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class BaseController<TIRepository, TEntity, TKey> : ControllerBase
        where TEntity : class
        where TIRepository : IGeneralRepository<TEntity, TKey>
    {
        protected TIRepository _repository;

        public BaseController(TIRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetAsync()
        {
            var entity = await _repository.GetAllAsync();
            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetAsync(TKey id)
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

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = entity
            });
        }

        [HttpPost]
        public virtual async Task<IActionResult> PostAsync([FromBody] TEntity entity)
        {
            try
            {
                await _repository.InsertAsync(entity);
                return CreatedAtAction(nameof(GetAsync), new { id = GetAsync() }, entity);
            }
            catch
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    message = "Input Error"
                });
            }
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> PutAsync(TKey id, [FromBody] TEntity entity)
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

                await _repository.UpdateAsync(entity);
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

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteAsync(TKey id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    message = "Data Not Found."
                });
            }

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
