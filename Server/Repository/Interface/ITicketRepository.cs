using Server.Models;

namespace Server.Repository.Interface
{
    public interface ITicketRepository : IGeneralRepository<Ticket, int>
    {
        Task<int> Total(int id);
        Task<int> Sales(int id);
    }
}
