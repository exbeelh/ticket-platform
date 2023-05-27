using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountriesController : BaseController<ICountryRepository, Country, string>
    {
        public CountriesController(ICountryRepository repository) : base(repository)
        {
        }
    }
}
