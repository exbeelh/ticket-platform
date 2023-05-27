using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IOrganizerRepository : IGeneralRepository<Organizer, int>
    {
        Task<Organizer> GetByUserId(int id);
        Task<int> UpdateOrganizer(OrganizerVM organizer);
    }
}
