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

        public Task<Ticket> Sales(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Ticket> Total()
        {
            throw new NotImplementedException();
        }
    }
}
