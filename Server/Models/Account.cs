using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Account
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Password { get; set; } = null!;

    public virtual ICollection<AccountRole> AccountRoles { get; set; } = new List<AccountRole>();

    public virtual User User { get; set; } = null!;
}
