using Client.Models;
using Client.Repositories.Contracts;
using Client.ViewModels;
using Newtonsoft.Json;
using System.Text;

namespace Client.Repositories.Data;

public class AccountRepository : GeneralRepository<Account,string>, IAccountRepository
{
    private readonly HttpClient httpClient;
    private readonly string request;

    public AccountRepository(string request = "Accounts/") : base(request)
    {
        httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:7292/api/")
        };
        this.request = request;
    }

    public async Task<ResponseLoginVM> Login(LoginVM entity)
    {
        StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
        var result = await httpClient.PostAsync(request + "Login", content);
        string apiResponse = await result.Content.ReadAsStringAsync();
        ResponseLoginVM responseLoginVM = JsonConvert.DeserializeObject<ResponseLoginVM>(apiResponse);
        return responseLoginVM;
    }
}
