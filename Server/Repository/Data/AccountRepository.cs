using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class AccountRepository : GeneralRepository<Account, int, DbTicketPlatformContext>, IAccountRepository
    {
        public AccountRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
