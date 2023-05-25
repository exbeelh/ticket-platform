using Server.Models;

namespace Server.Repository.Interface
{
    public interface IOrderItemRepository : IGeneralRepository<OrderItem, int>
    {
        Task<IEnumerable<OrderItem>> GetByOrderId(int id);
    }
}
