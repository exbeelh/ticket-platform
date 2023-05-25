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
        public AttendeeRepository(MyContext context) : base(context)
        {
        }

        public async Task<IEnumerable<AttendeeVM>> OrderTickets(int eventId)
        {
            var result = from order in _context.Orders
                         join user in _context.Users on order.UserId equals user.Id
                         join events in _context.Events on order.EventId equals events.Id
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
                                                TicketName = ticket.Name,
                                                FirstName = attendee.FirstName,
                                                LastName = attendee.LastName,
                                                Email = attendee.Email,
                                                Code = attendee.Code
                                            }).ToList()
                            };

            return await result.ToListAsync();
        }

        public async Task<IEnumerable<Attendee>> GetByOrderId(int orderId)
        {
            var result = await _context.Attendees.Where(x => x.OrderId == orderId).ToListAsync();
            return result;
        }
    }
}
