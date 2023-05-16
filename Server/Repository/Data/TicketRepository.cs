using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class TicketRepository : GeneralRepository<Ticket, int, DbTicketPlatformContext>, ITicketRepository
    {
        public TicketRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
