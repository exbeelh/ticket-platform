using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class CountryRepository : GeneralRepository<Country, string, MyContext>, ICountryRepository
    {
        public CountryRepository(MyContext context) : base(context)
        {
        }
    }
}
