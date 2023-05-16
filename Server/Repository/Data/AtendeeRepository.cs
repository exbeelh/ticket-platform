using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class AtendeeRepository : GeneralRepository<Atendee, int, DbTicketPlatformContext>, IAtendeeRepository
    {
        public AtendeeRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
