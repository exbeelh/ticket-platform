using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModel;

namespace Server.Repository.Data
{
    public class AccountRepository : GeneralRepository<Account, int, MyContext>, IAccountRepository
    {
        public AccountRepository(MyContext context) : base(context)
        {
        }

        public Task<UserDataVM> GetUserData(string email)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Login(LoginVM loginVM)
        {
            throw new NotImplementedException();
        }

        public Task<int> Register(RegisterVM registerVM)
        {
            throw new NotImplementedException();
        }
    }
}
