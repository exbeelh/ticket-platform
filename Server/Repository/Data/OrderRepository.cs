using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrderRepository : GeneralRepository<Order, int, DbTicketPlatformContext>, IOrderRepository
    {
        public OrderRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
