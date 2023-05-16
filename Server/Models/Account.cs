using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Account
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string? Address { get; set; }

    public string City { get; set; } = null!;

    public string? PostalCode { get; set; }

    public string? State { get; set; }

    public string? CountryId { get; set; }

    [JsonIgnore]
    public virtual Country? Country { get; set; }

    [JsonIgnore]
    public virtual User User { get; set; } = null!;
}
