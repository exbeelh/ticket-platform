using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface ITicketRepository : IGeneralRepository<Ticket, int>
    {
        Task<TotalVM> Total(int eventId);
        Task<Ticket> GetByName(string name);
        Task<IEnumerable<Ticket>> GetByEventId(int eventId);
    }
}
