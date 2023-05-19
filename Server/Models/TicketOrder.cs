using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class TicketOrder
{
    public int Id { get; set; }

    public int TicketId { get; set; }

    public int OrderId { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
