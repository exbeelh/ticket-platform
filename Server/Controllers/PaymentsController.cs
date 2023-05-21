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
    public class PaymentsController : BaseController<IPaymentRepository, Payment, int>
    {
        public PaymentsController(IPaymentRepository repository) : base(repository)
        {
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

            entity.Status = 1;
            await _repository.UpdateAsync(entity);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = "Event has been Approved!"
            });
        }

        [HttpPut("Reject/{id}")]
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

            entity.Status = 2;
            await _repository.UpdateAsync(entity);

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = "Event has been Banned!"
            });
        }
    }
}
