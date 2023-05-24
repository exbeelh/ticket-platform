using Server.Models;

namespace Server.Repository.Interface
{
    public interface IOrganizerRepository : IGeneralRepository<Organizer, int>
    {
        Task<Organizer> GetByUserId(int id);
    }
}
