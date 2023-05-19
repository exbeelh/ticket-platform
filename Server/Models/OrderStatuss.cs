using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class OrderStatuss
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
