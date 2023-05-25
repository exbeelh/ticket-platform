using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;
using System.Net.Sockets;

namespace Server.Repository.Data
{
    public class AttendeeRepository : GeneralRepository<Attendee, int, MyContext>, IAttendeeRepository
    {

        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IEventRepository _eventRepository;
        private readonly ITicketRepository _ticketRepository;

        public AttendeeRepository(
            MyContext context,
            IOrderRepository orderRepository,
            IUserRepository userRepository,
            IEventRepository eventRepository,
            ITicketRepository ticketRepository) : base(context)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _eventRepository = eventRepository;
            _ticketRepository = ticketRepository;
        }

        public async Task<IEnumerable<AttendeeVM>> OrderTickets(int id)
        {
            var getOrders = await _orderRepository.GetAllAsync();
            var getUsers = await _userRepository.GetAllAsync();
            var getEvents = await _eventRepository.GetAllAsync();
            var getTickets = await _ticketRepository.GetAllAsync();

            var result = from order in getOrders
                         join user in getUsers on order.UserId equals user.Id
                         join events in getEvents on order.EventId equals events.Id
                         join ticket in getTickets on events.Id equals ticket.EventId
                         where events.Id == id && order.OrderStatusId == 1
                         select new AttendeeVM
                         {
                             TransactionId = order.TransactionId,
                             FullName = user.Firstname + " " + user.Lastname,
                             Price = ticket.Price,
                             quantity = ticket.QuantityAvailable
                         };

            return result.ToList();
        }
    }
}
