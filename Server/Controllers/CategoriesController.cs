using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class CategoriesController : BaseController<ICategoryRepository, Category, int>
    {
        public CategoriesController(ICategoryRepository repository) : base(repository)
        {
        }
    }
}
