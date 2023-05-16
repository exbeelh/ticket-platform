using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketOrdersRepository : BaseController<ITicketOrderRepository, TicketOrder, int>
    {
        public TicketOrdersRepository(ITicketOrderRepository repository) : base(repository)
        {
        }
    }
}
