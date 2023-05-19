using Server.Models;

namespace Server.Repository.Interface
{
    public interface IOrderRepository : IGeneralRepository<Order, int>
    {
        Task<Order> TicketSales(int id);
        Task<Order> Details(int id);
        Task<Order> Revenue(int id);
    }
}
