using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketOrdersController : BaseController<ITicketOrderRepository, TicketOrder, int>
    {
        public TicketOrdersController(ITicketOrderRepository repository) : base(repository)
        {
        }
    }
}
