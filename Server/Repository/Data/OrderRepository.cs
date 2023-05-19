using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrderRepository : GeneralRepository<Order, int, MyContext>, IOrderRepository
    {
        public OrderRepository(MyContext context) : base(context)
        {
        }

        public Task<Order> Details(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Order> Revenue(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Order> TicketSales(int id)
        {
            throw new NotImplementedException();
        }
    }
}
