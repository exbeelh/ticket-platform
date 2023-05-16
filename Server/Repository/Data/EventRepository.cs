using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class EventRepository : GeneralRepository<Event, int, DbTicketPlatformContext>, IEventRepository
    {
        public EventRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
