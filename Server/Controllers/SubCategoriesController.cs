using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class SubCategoriesController : BaseController<ISubCategoryRepository, SubCategory, int>
    {
        public SubCategoriesController(ISubCategoryRepository repository) : base(repository)
        {
        }
    }
}
