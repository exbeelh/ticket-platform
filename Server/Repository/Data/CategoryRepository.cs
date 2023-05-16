using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class CategoryRepository : GeneralRepository<Category, int, DbTicketPlatformContext>, ICategoryRepository
    {
        public CategoryRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
