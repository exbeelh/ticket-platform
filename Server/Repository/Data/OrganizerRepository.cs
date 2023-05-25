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

        public async Task<Organizer> GetByUserId(int id)
        {
            var getOrganizers = await GetAllAsync();
            var data = getOrganizers.Where(x => x.UserId == id).FirstOrDefault();
            return data!;
        }
    }
}
