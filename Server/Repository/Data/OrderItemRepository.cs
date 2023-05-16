using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrderItemRepository : GeneralRepository<OrderItem, int, DbTicketPlatformContext>, IOrderItemRepository
    {
        public OrderItemRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
