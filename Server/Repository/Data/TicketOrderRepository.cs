using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class TicketOrderRepository : GeneralRepository<TicketOrder, int, DbTicketPlatformContext>, ITicketOrderRepository
    {
        public TicketOrderRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
