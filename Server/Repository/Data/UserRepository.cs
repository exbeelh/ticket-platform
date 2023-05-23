using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Repository.Data
{
    public class UserRepository : GeneralRepository<User, int, MyContext>, IUserRepository
    {
        public UserRepository(MyContext context) : base(context)
        {
        }

        public async Task<UserDataVM> GetUserDataByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
            return new UserDataVM
            {
                Id = user!.Id,
                Email = user.Email,
                FullName = string.Concat(user.Firstname, " ", user.Lastname)
            };
        }
    }
}
