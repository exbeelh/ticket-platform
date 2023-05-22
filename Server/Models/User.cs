using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

    [JsonIgnore]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

    [JsonIgnore]
    public virtual Country? Country { get; set; }

    [JsonIgnore]
    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    [JsonIgnore]
    public virtual ICollection<Organizer> Organizers { get; set; } = new List<Organizer>();

    [JsonIgnore]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    [JsonIgnore]
    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
