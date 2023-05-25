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

        public AttendeeRepository(
            MyContext context,
            IOrderRepository orderRepository,
            IUserRepository userRepository,
            IEventRepository eventRepository) : base(context)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<AttendeeVM>> OrderTickets(int eventId)
        {
            var getOrders = await _orderRepository.GetAllAsync();
            var getUsers = await _userRepository.GetAllAsync();
            var getEvents = await _eventRepository.GetAllAsync();

            var result = from order in getOrders
                         join user in getUsers on order.UserId equals user.Id
                         join events in getEvents on order.EventId equals events.Id
                         where events.Id == eventId && order.OrderStatusId == 3
                         select new AttendeeVM
                         {
                             OrderId = order.Id,
                             TransactionId = order.TransactionId,
                             FullName = user.Firstname + " " + user.Lastname,
                             Email = user.Email,
                             Attendees = (from attendee in _context.Attendees
                                         join ticket in _context.Tickets on attendee.TicketId equals ticket.Id
                                         where attendee.OrderId == order.Id
                                         select new AttendeeListVM
                                         {
                                             TransactionId = order.TransactionId,
                                             TicketId = ticket.Id,
                                             TicketName = ticket!.Name,
                                             FirstName = attendee.FirstName,
                                             LastName = attendee.LastName,
                                             Email = attendee.Email,
                                             Code = attendee.Code
                                         }).ToList()
                         };
            
            return result.ToList();
        }

        public async Task<IEnumerable<Attendee>> GetByOrderId(int orderId)
        {
            var result = await _context.Attendees.Where(x => x.OrderId == orderId).ToListAsync();
            return result;
        }
    }
}
