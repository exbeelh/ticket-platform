using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IAccountRepository : IGeneralRepository<Account, int>
    {
        Task<bool> Login(LoginVM loginVM);
        Task<int> Register(RegisterVM registerVM);
        Task<UserDataVM> GetUserDataAsync(string email);
        Task<IEnumerable<string>> GetRoleByEmailAsync(string email);
    }
}
