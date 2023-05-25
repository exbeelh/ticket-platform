using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Data;
using Server.Models;
using Server.ViewModels;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class TicketRepository : GeneralRepository<Ticket, int, MyContext>, ITicketRepository
    {
        public TicketRepository(MyContext context) : base(context)
        {
        }

        public async Task<TotalVM> Total(int eventId)
        {
            // get total all tickets quantityAvailable + quantitySold
            var totalAllTickets = await (from ticket in _context.Tickets
                                         where ticket.EventId == eventId
                                         select ticket.QuantityAvailable + ticket.QuantitySold).SumAsync();

            var totalTicketsSold = await (from ticket in _context.Tickets
                                          join orderItem in _context.OrderItems on ticket.Id equals orderItem.Id
                                          join order in _context.Orders on orderItem.OrderId equals order.Id
                                          where order.EventId == eventId
                                          select orderItem.Quantity).SumAsync();
            var totalTicketsRemaining = totalAllTickets - totalTicketsSold;

            var totalVM = new TotalVM
            {
                TotalAllTickets = totalAllTickets,
                TotalTicketsSold = totalTicketsSold,
                TotalTicketsRemaining = totalTicketsRemaining
            };

            return totalVM;
        }

        public async Task<Ticket> GetByName(string name)
        {
            var data = await _context.Tickets.FirstOrDefaultAsync(x => x.Name == name);
            return data;
        }

        public async Task<IEnumerable<Ticket>> GetByEventId(int eventId)
        {
            var data = await _context.Tickets.Where(x => x.EventId == eventId).ToListAsync();
            return data;
        }
    }
}
