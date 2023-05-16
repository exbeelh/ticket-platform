using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class User
{
    public int Id { get; set; }

    public string Firstname { get; set; } = null!;

    public string? Lastname { get; set; }

    public string? Email { get; set; }

    public string Password { get; set; } = null!;

    public string? Picture { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Website { get; set; }

    public int IsActive { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpireTime { get; set; }

    public int? RoleId { get; set; }

    [JsonIgnore]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

    [JsonIgnore]
    public virtual ICollection<Organizer> Organizers { get; set; } = new List<Organizer>();

    [JsonIgnore]
    public virtual Role? Role { get; set; }
}
