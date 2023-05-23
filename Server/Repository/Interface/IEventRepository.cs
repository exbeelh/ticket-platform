using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IEventRepository : IGeneralRepository<Event, int>
    {
        Task<IEnumerable<EventVM>> Upcoming();
        Task<IEnumerable<EventVM>> Aprove();
        Task<IEnumerable<EventVM>> Ban();
        Task<IEnumerable<EventVM>> Category(int id);
        Task<IEnumerable<EventVM>> Search(string query);
        Task<EventTicketVM> Ticket(int id);
    }
}
