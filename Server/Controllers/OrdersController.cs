using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : BaseController<IOrderRepository, Order, int>
    {
        public OrdersController(IOrderRepository repository) : base(repository)
        {
        }

        [HttpPost("BuyTickets")]
        public async Task<ActionResult> BuyTickets(OrderTicketVM orderTicketVM)
        {
            var result = await _repository.BuyTickets(orderTicketVM);

            if (result == null)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to buy ticket"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = result
            });
        }

        [HttpGet("Booking/{transactionId}")]
        public async Task<ActionResult> Booking(string transactionId)
        {
            var result = await _repository.GetOrderDetailsByTransactionId(transactionId);

            if (result == null)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to get order"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = result
            });
        }

        [HttpPost("Booking")]
        public async Task<ActionResult> Booking(SaveBookingVM saveBookingVM)
        {
            var result = await _repository.saveBooking(saveBookingVM);

            if (result == 0)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to save booking"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = "Booking saved"
            });
        }
    }
}
