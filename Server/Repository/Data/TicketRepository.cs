using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class TicketRepository : GeneralRepository<Ticket, int, MyContext>, ITicketRepository
    {

        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IOrderItemRepository _orderRepository;

        public TicketRepository(
            MyContext context, 
            IOrderItemRepository orderItemRepository,
            IOrderItemRepository orderRepository) : base(context)
        {
            _orderItemRepository = orderItemRepository;
            _orderRepository = orderRepository;
        }

        public Task<int> Sales(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Total(int id)
        {
            var getTickets = await GetAllAsync();
            var getOrderItems = await _orderItemRepository.GetAllAsync();
            var getOrders = await _orderRepository.GetAllAsync();

            var totalTicketsSold = (from ticket in getTickets
                                    join orderItem in getOrderItems on ticket.Id equals orderItem.Id
                                    join order in _context.Orders on orderItem.OrderId equals order.Id
                                    where order.EventId == id
                                    select orderItem.Quantity).Sum();

            return (int)totalTicketsSold!;
        }
    }
}
