using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class AttendeeRepository : GeneralRepository<Attendee, int, MyContext>, IAttendeeRepository
    {
        public AttendeeRepository(MyContext context) : base(context)
        {
        }

        public Task<Attendee> OrderTickets(int id)
        {
            throw new NotImplementedException();
        }
    }
}
