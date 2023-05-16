using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class OrderStatussesController : BaseController<IOrderStatusRepository, OrderStatus, int>
    {
        public OrderStatussesController(IOrderStatusRepository repository) : base(repository)
        {
        }
    }
}
