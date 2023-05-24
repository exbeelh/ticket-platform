using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class OrganizerRepository : GeneralRepository<Organizer, int, MyContext>, IOrganizerRepository
    {
        public OrganizerRepository(MyContext context) : base(context)
        {
        }

        public Task<Organizer> GetByUserId(int id)
        {
            var data = _context.Organizers.Where(x => x.UserId == id).FirstOrDefaultAsync();
            return data;
        }
    }
}
