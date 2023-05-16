using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Organizer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int? DescriptionStatus { get; set; }

    public string? Link { get; set; }

    public int? Status { get; set; }

    public string? Facebook { get; set; }

    public string? Twitter { get; set; }

    public string Image { get; set; } = null!;

    public int CreatedBy { get; set; }

    [JsonIgnore]
    public virtual User CreatedByNavigation { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}
