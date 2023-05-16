using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class TicketOrdersRepository : BaseController<ITicketOrderRepository, TicketOrder, int>
    {
        public TicketOrdersRepository(ITicketOrderRepository repository) : base(repository)
        {
        }
    }
}
