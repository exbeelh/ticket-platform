using Server.Models;
using Server.ViewModel;

namespace Server.Repository.Interface
{
    public interface IUserRepository : IGeneralRepository<User, int>
    {
        Task<UserDataVM> GetUserDataByEmailAsync(string email);
    }
}
