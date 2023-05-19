using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrderItemRepository : GeneralRepository<OrderItem, int, MyContext>, IOrderItemRepository
    {
        public OrderItemRepository(MyContext context) : base(context)
        {
        }
    }
}
