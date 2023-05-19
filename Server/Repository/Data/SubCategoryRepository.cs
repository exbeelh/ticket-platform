using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class SubCategoryRepository : GeneralRepository<SubCategory, int, MyContext>, ISubCategoryRepository
    {
        public SubCategoryRepository(MyContext context) : base(context)
        {
        }
    }
}
