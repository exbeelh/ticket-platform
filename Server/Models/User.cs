using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class User
{
    public int Id { get; set; }

    public string Firstname { get; set; } = null!;

    public string? Lastname { get; set; }

    public string Email { get; set; } = null!;

    public string? Picture { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string? Website { get; set; }

    public int IsActive { get; set; }

    public string? Address { get; set; }

    public string City { get; set; } = null!;

    public string? PostalCode { get; set; }

    public string? State { get; set; }

    public string? CountryId { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

    public virtual Country? Country { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Organizer> Organizers { get; set; } = new List<Organizer>();
}
