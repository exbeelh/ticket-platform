using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;
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
        public async Task<ActionResult> Approved(int id)
        {
            var entity = await _repository.Approve(id);

            if (entity > 0)
            {
                return Ok(new
                {
                    code = StatusCodes.Status200OK,
                    status = HttpStatusCode.OK.ToString(),
                    data = "Payment has been Approved!"
                });
            }
            else
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Payment Failed to Approved!"
                });
            }
        }

        [HttpPut("Reject/{id}")]
        public async Task<ActionResult> Reject(int id)
        {
            var entity = await _repository.Reject(id);

            if (entity > 0)
            {
                return Ok(new
                {
                    code = StatusCodes.Status200OK,
                    status = HttpStatusCode.OK.ToString(),
                    data = "Payment has been Rejected!"
                });
            }
            else
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Payment Failed to Rejected!"
                });
            }
        }

        [HttpPost("Upload")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> UploadProof([FromForm] UploadProofVM uploadProofVM)
        {
            var entity = await _repository.UploadProof(uploadProofVM);

            if (entity > 0)
            {
                return Ok(new
                {
                    code = StatusCodes.Status200OK,
                    status = HttpStatusCode.OK.ToString(),
                    data = "Upload Proof Success!"
                });
            }
            else
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Upload Proof Failed!"
                });
            }
        }

        [HttpGet("ListPendingPayment")]
        public async Task<ActionResult> GetByUserOrganizerId(int id)
        {
            var entity = await _repository.GetByUserOrganizerId(id);

            if (entity != null)
            {
                return Ok(new
                {
                    code = StatusCodes.Status200OK,
                    status = HttpStatusCode.OK.ToString(),
                    data = entity
                });
            }
            else
            {
                return NotFound(new
                {
                    code = StatusCodes.Status404NotFound,
                    status = HttpStatusCode.NotFound.ToString(),
                    message = "Data Not Found!"
                });
            }
        }
    }
}
