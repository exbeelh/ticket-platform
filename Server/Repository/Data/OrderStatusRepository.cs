using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrderStatusRepository : GeneralRepository<OrderStatus, int, DbTicketPlatformContext>, IOrderStatusRepository
    {
        public OrderStatusRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
