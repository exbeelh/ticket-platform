using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class TicketOrder
{
    public int Id { get; set; }

    public int? TicketId { get; set; }

    public int? OrderId { get; set; }

    [JsonIgnore]
    public virtual Order? Order { get; set; }

    [JsonIgnore]
    public virtual Ticket? Ticket { get; set; }
}
