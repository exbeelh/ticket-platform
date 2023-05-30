using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "User,Event Organizer")]
    public class OrdersController : BaseController<IOrderRepository, Order, int>
    {
        public OrdersController(IOrderRepository repository) : base(repository)
        {
        }

        [HttpPost("BuyTickets")]
        [Authorize(Roles = "User")]
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
        [Authorize(Roles = "User")]
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
        [Authorize(Roles = "User")]
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

        [HttpGet("MyTickets/{userId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> MyTickets(int userId)
        {
            var result = await _repository.MyTickets(userId);

            if (result == null)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to get my tickets"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = result
            });
        }

        [HttpGet("Detail/{transactionId}")]
        [AllowAnonymous]
        public async Task<ActionResult> Detail(string transactionId)
        {
            var result = await _repository.GetOrderDetail(transactionId);

            if (result == null)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to get order details"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = result
            });
        }

        [HttpGet("TicketSales/{eventId}")]
        [Authorize(Roles = "Event Organizer")]
        public async Task<ActionResult> TicketSales(int eventId)
        {
            var result = await _repository.TicketSales(eventId);

            if (result == null)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to get ticket sales"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = result
            });
        }

        [HttpGet("Revenue/{eventId}")]
        [Authorize(Roles = "Event Organizer")]
        public async Task<ActionResult> Revenue(int eventId)
        {
            var result = await _repository.Revenue(eventId);

            if (result == null)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to get revenue"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = result
            });
        }

        [HttpPut("Cancel/{id}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> Cancel(int id)
        {
            var result = await _repository.CancelOrder(id);

            if (result == 0)
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    data = "Failed to cancel order"
                });
            }

            return Ok(new
            {
                code = StatusCodes.Status200OK,
                status = HttpStatusCode.OK.ToString(),
                data = "Order canceled"
            });
        }
    }
}
