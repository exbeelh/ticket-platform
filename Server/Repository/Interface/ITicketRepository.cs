using Server.Models;

namespace Server.Repository.Interface
{
    public interface ITicketRepository : IGeneralRepository<Ticket, int>
    {
        Task<Ticket> Total();
        Task<Ticket> Sales(int id);
    }
}
