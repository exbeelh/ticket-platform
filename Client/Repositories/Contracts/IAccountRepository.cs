using Client.Models;
using Client.ViewModels;

namespace Client.Repositories.Contracts;

public interface IAccountRepository : IGeneralRepository<Account, string>
{
    public Task<ResponseLoginVM> Login(LoginVM entity);
}
