using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class CountryRepository : GeneralRepository<Country, string, DbTicketPlatformContext>, ICountryRepository
    {
        public CountryRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
