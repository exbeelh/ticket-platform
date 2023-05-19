using Server.Models;
using Server.ViewModel;

namespace Server.Repository.Interface
{
    public interface IEventRepository : IGeneralRepository<Event, int>
    {
        Task<IEnumerable<Event>> Upcoming();
        Task<IEnumerable<Event>> Aprove(int id);
        Task<IEnumerable<Event>> Ban(int id);
        Task<IEnumerable<Event>> Cancel(int id);
        Task<IEnumerable<Event>> Payment(int id);
    }
}
