using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModel;
using System.Net.Sockets;

namespace Server.Repository.Data
{
    public class AttendeeRepository : GeneralRepository<Attendee, int, MyContext>, IAttendeeRepository
    {
        public AttendeeRepository(MyContext context) : base(context)
        {
        }

        public async Task<IEnumerable<AttendeeVM>> OrderTickets(int id)
        {
            var result = from order in _context.Orders
                         join user in _context.Users on order.UserId equals user.Id
                         join events in _context.Events on order.EventId equals events.Id
                         join ticket in _context.Tickets on events.Id equals ticket.EventId
                         where events.Id == id && order.OrderStatusId == 1
                         select new AttendeeVM
                         {
                             TransactionId = order.TransationId,
                             FullName = user.Firstname + " " + user.Lastname,
                             Price = ticket.Price,
                             quantity = ticket.QuantityAvaible
                         };

            return await result.ToListAsync();
        }
    }
}
