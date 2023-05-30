using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IAttendeeRepository : IGeneralRepository<Attendee, int>
    {
        Task<IEnumerable<AttendeeVM>> OrderTickets(int eventId);
        Task<IEnumerable<Attendee>> GetByOrderId(int orderId);
        Task<AttendeeVM> GetAttendeeByOrderId(int orderId);
    }
}
