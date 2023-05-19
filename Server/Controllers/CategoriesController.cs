using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : BaseController<ICategoryRepository, Category, int>
    {
        public CategoriesController(ICategoryRepository repository) : base(repository)
        {
        }
    }
}
