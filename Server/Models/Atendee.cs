using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Atendee
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public int EventId { get; set; }

    public int TicketId { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Code { get; set; }

    public virtual Order Order { get; set; } = null!;
}
