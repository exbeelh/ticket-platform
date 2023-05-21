using Server.Models;
using Server.ViewModel;

namespace Server.Repository.Interface
{
    public interface IEventRepository : IGeneralRepository<Event, int>
    {
        Task<IEnumerable<EventVM>> Upcoming();
        Task<IEnumerable<EventVM>> Aprove();
        Task<IEnumerable<EventVM>> Ban();
        Task<IEnumerable<EventVM>> Cancel(int id);
        Task<IEnumerable<EventVM>> Payment(int id);
        Task<IEnumerable<EventVM>> Category();
        Task<IEnumerable<EventVM>> Search(string query);
    }
}
