using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class TicketRepository : GeneralRepository<Ticket, int, MyContext>, ITicketRepository
    {
        public TicketRepository(MyContext context) : base(context)
        {
        }

        public Task<int> Sales(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Total(int id)
        {
            var totalTicketsSold = await (from ticket in _context.Tickets
                                         join orderItem in _context.OrderItems on ticket.Id equals orderItem.Id
                                         join order in _context.Orders on orderItem.OrderId equals order.Id
                                         where order.EventId == id
                                         select orderItem.Quantity).SumAsync();

            return (int)totalTicketsSold;
        }
    }
}
