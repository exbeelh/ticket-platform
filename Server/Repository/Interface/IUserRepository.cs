using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IUserRepository : IGeneralRepository<User, int>
    {
        Task<UserDataVM> GetUserDataByEmailAsync(string email);
        Task<int> UpdateUser(ProfileVM profile);
    }
}
