using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class SubCategoryRepository : GeneralRepository<SubCategory, int, DbTicketPlatformContext>, ISubCategoryRepository
    {
        public SubCategoryRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
