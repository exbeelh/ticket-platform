using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class CategoryRepository : GeneralRepository<Category, int, MyContext>, ICategoryRepository
    {
        public CategoryRepository(MyContext context) : base(context)
        {
        }
    }
}
