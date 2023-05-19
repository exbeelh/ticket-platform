using Server.Models;

namespace Server.Repository.Interface
{
    public interface IAttendeeRepository : IGeneralRepository<Attendee, int>
    {
        Task<Attendee> OrderTickets(int id);
    }
}
