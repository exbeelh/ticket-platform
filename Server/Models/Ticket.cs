using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Ticket
{
    public int Id { get; set; }

    public int EventId { get; set; }

    public int Type { get; set; }

    public int QuantityAvaible { get; set; }

    public int QuantitySold { get; set; }

    public decimal? Price { get; set; }

    public int UserId { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<TicketOrder> TicketOrders { get; set; } = new List<TicketOrder>();
}
