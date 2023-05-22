using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrderStatusRepository : GeneralRepository<OrderStatus, int, MyContext>, IOrderStatusRepository
    {
        public OrderStatusRepository(MyContext context) : base(context)
        {
        }
    }
}
