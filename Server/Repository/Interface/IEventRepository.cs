using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IEventRepository : IGeneralRepository<Event, int>
    {
        Task<IEnumerable<EventVM>> Upcoming();
        Task<IEnumerable<EventVM>> Aprove();
        Task<IEnumerable<EventVM>> Ban();
        Task<IEnumerable<EventVM>> Featured();
        Task<IEnumerable<EventVM>> Category(int id);
        Task<IEnumerable<EventVM>> Search(string query);
        Task<Event> Detail(string slug);
        Task<IEnumerable<Ticket?>> Ticket(int id);
        Task<int> RequestEvent(RequestEventVM requestEventVM);
        Task<IEnumerable<Event>> GetByUserOrganizerId(int userId);
    }
}
