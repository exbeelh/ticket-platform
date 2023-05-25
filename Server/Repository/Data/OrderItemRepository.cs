using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<OrderItem>> GetByOrderId(int id)
        {
            var data = await _context.OrderItems.Where(x => x.OrderId == id).ToListAsync();
            return data;
        }
    }
}
