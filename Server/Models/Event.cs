using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Event
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public int Type { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? EndTime { get; set; }

    public string Image { get; set; } = null!;

    public string? Description { get; set; }

    public string? Address { get; set; }

    public int SubCategoryId { get; set; }

    public int OrganizerId { get; set; }

    public string? Link { get; set; }

    public string? Note { get; set; }

    public int? Views { get; set; }

    public int IsPublish { get; set; }

    public int CreatedBy { get; set; }

    public virtual Organizer Organizer { get; set; } = null!;

    public virtual SubCategory SubCategory { get; set; } = null!;

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
