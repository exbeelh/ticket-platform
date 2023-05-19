using Server.Models;
using Server.ViewModel;

namespace Server.Repository.Interface
{
    public interface IAccountRepository : IGeneralRepository<Account, int>
    {
        Task<bool> Login(LoginVM loginVM);
        Task<int> Register(RegisterVM registerVM);
        Task<UserDataVM> GetUserData(string email);
    }
}
