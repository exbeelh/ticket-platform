using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Repository.Data
{
    public class UserRepository : GeneralRepository<User, int, MyContext>, IUserRepository
    {
        private readonly IFileRepository _fileRepository;

        public UserRepository(MyContext context, IFileRepository fileRepository) : base(context)
        {
            _fileRepository = fileRepository;
        }

        public async Task<UserDataVM> GetUserDataByEmailAsync(string email)
        {
            var getUsers = await GetAllAsync();

            var user = getUsers.FirstOrDefault(user => user.Email == email);
            return new UserDataVM
            {
                Id = user!.Id,
                Email = user.Email,
                FullName = string.Concat(user.Firstname, " ", user.Lastname)
            };
        }

        public async Task<int> UpdateUser(ProfileVM profile)
        {
            var getUser = await GetByIdAsync(profile.Id);

            getUser.Firstname = profile.Firstname;
            getUser.Lastname = profile.Lastname;
            getUser.Picture = await _fileRepository.SaveImageAsync(profile.PictureFile!) ?? getUser.Picture;
            getUser.PhoneNumber = profile.PhoneNumber;
            getUser.Website = profile.Website;
            getUser.Address = profile.Address;
            getUser.City = profile.City;
            getUser.PostalCode = profile.PostalCode;
            getUser.State = profile.State;
            getUser.CountryId = profile.CountryId;

            return await _context.SaveChangesAsync();
        }
    }
}
