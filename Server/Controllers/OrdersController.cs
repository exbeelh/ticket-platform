using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class OrdersController : BaseController<IOrderRepository, Order, int>
    {
        public OrdersController(IOrderRepository repository) : base(repository)
        {
        }
    }
}
