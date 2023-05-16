using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class CountriesController : BaseController<ICountryRepository, Country, string>
    {
        public CountriesController(ICountryRepository repository) : base(repository)
        {
        }
    }
}
