using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Repository.Data
{
    public class OrderRepository : GeneralRepository<Order, int, MyContext>, IOrderRepository
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrderStatusRepository _orderStatusRepository;
        private readonly ITicketOrderRepository _ticketOrderRepository;


        public OrderRepository(MyContext context, IUserRepository userRepository, IOrderStatusRepository orderStatusRepository, ITicketOrderRepository ticketOrderRepository) : base(context)
        {
            _userRepository = userRepository;
            _orderStatusRepository = orderStatusRepository;
            _ticketOrderRepository = ticketOrderRepository;
        }

        public Task<Order> Details(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EventVM>> Revenue(int id)
        {
            throw new NotImplementedException();
        }

        public Task<RevenueVM> TicketSales(int id)
        {
            throw new NotImplementedException();
        }
    }
}
