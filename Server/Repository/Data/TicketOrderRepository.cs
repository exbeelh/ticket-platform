using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class TicketOrderRepository : GeneralRepository<TicketOrder, int, MyContext>, ITicketOrderRepository
    {
        public TicketOrderRepository(MyContext context) : base(context)
        {
        }
    }
}
