using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class SubCategory
{
    public int Id { get; set; }

    public int CategoryId { get; set; }

    public string Name { get; set; } = null!;

    public string Slug { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}
