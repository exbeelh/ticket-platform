using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class AccountRole
{
    public int Id { get; set; }

    public int? AccountId { get; set; }

    public int? RoleId { get; set; }

    [JsonIgnore]
    public virtual Account? Account { get; set; }

    [JsonIgnore]
    public virtual Role? Role { get; set; }
}
