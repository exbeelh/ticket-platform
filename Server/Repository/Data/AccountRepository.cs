using Server.Data;
using Server.Handlers;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Repository.Data
{
    public class AccountRepository : GeneralRepository<Account, int, MyContext>, IAccountRepository
    {
        private readonly IUserRepository _userRepository;
        private readonly IAccountRoleRepository _accountRoleRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IOrganizerRepository _organizerRepository;
        private readonly IFileRepository _fileRepository;


        public AccountRepository(
            MyContext context,
            IAccountRoleRepository accountRoleRepository,
            IUserRepository userRepository,
            IRoleRepository roleRepository,
            IOrganizerRepository organizerRepository,
            IFileRepository fileRepository
            ) : base(context)
        {
            _accountRoleRepository = accountRoleRepository;
            _roleRepository = roleRepository;
            _userRepository = userRepository;
            _organizerRepository = organizerRepository;
            _fileRepository = fileRepository;
        }

        public async Task<IEnumerable<string>> GetRoleByEmailAsync(string email)
        {
            var getUserEmail = await _userRepository.GetUserDataByEmailAsync(email);
            var getRole = await _accountRoleRepository.GetRolesByIdAsync(getUserEmail.Id);

            return getRole;
        }

        public async Task<UserDataVM> GetUserDataAsync(string email)
        {
            var getEmployees = await _userRepository.GetAllAsync();
            var getAccounts = await GetAllAsync();

            var getUserData = getEmployees.Join(getAccounts,
                                                user => user.Id,
                                                account => account.UserId,
                                                (u, a) => new UserDataVM
                                                {
                                                    Id = u.Id,
                                                    FullName = u.Firstname + " " + u.Lastname,
                                                    Email = u.Email
                                                })
                                          .FirstOrDefault(ud => ud.Email == email);

            return getUserData!;
        }

        public async Task<bool> Login(LoginVM loginVM)
        {
            var getUsers = await _userRepository.GetAllAsync();
            var getAccounts = await GetAllAsync();

            var getUserData = getUsers.Join(getAccounts,
                                               user => user.Id,
                                               account => account.UserId,
                                               (u, a) => new LoginVM
                                               {
                                                   Email = u.Email,
                                                   Password = a.Password
                                               })
                                          .FirstOrDefault(userData => userData.Email == loginVM.Email);

            return getUserData is not null && Hashing.ValidatePassword(loginVM.Password, getUserData.Password);
        }

        public async Task<int> Register(RegisterVM registerVM)
        {
            await using var transaction = _context.Database.BeginTransaction();
            try
            {
                var user = await _userRepository.InsertAsync(new User
                {
                    Firstname = registerVM.FirstName,
                    Lastname = registerVM.LastName,
                    Email = registerVM.Email,
                    Picture = registerVM.Picture,
                    PhoneNumber = registerVM.PhoneNumber,
                    Website = registerVM.Website,
                    Address = registerVM.Address,
                    City = registerVM.City,
                    PostalCode = registerVM.PostalCode,
                    State = registerVM.State,
                    CountryId = registerVM.CountryId,
                    IsActive = 1
                });

                var account = await InsertAsync(new Account
                {
                    UserId = user!.Id,
                    Password = Hashing.HashPassword(registerVM.Password)
                });

                var accountRole = await _accountRoleRepository.InsertAsync(new AccountRole
                {
                    AccountId = user!.Id,
                    RoleId = registerVM.Role
                });

                if (registerVM.Role == 3)  // Event Organizer
                {
                    var organizer = await _organizerRepository.InsertAsync(new Organizer
                    {
                        Name = registerVM.OrganizerName,
                        Description = registerVM.OrganizerDescription,
                        Image = await _fileRepository.SaveImageAsync(registerVM.OrganizerImageFile!),
                        UserId = user.Id
                    });
                }

                await transaction.CommitAsync();
                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                await transaction.RollbackAsync();
                return 0;
            }
        }
    }
}
