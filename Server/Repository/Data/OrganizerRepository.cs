using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrganizerRepository : GeneralRepository<Organizer, int, DbTicketPlatformContext>, IOrganizerRepositrory
    {
        public OrganizerRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
