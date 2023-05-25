namespace Client.Models;

public partial class Account
{
    public int UserId { get; set; }

    public string Password { get; set; } = null!;
}
