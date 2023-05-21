using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Event
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public int Type { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string Image { get; set; } = null!;

    public string? Description { get; set; }

    public string? Address { get; set; }

    public int? CategoryId { get; set; }

    public int? OrganizerId { get; set; }

    public int StatusId { get; set; }

    public string? Link { get; set; }

    public string? Note { get; set; }

    public int? Views { get; set; }

    public int IsPublish { get; set; }

    public int? UserId { get; set; }

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? EndTime { get; set; }

    [JsonIgnore] public virtual ICollection<Attendee> Attendees { get; set; } = new List<Attendee>();

    [JsonIgnore] public virtual Category? Category { get; set; }

    [JsonIgnore] public virtual Organizer? Organizer { get; set; }

    [JsonIgnore] public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    [JsonIgnore] public virtual User? User { get; set; }
}
