using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Account
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string Password { get; set; } = null!;

    [JsonIgnore] 
    public virtual ICollection<AccountRole> AccountRoles { get; set; } = new List<AccountRole>();

    [JsonIgnore] 
    public virtual User? User { get; set; }
}
