using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class AccountsController : BaseController<IAccountRepository, Account, int>
    {
        public AccountsController(IAccountRepository repository) : base(repository)
        {
        }
    }
}
