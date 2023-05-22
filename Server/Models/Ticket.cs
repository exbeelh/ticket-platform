using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Ticket
{
    public int Id { get; set; }

    public int? EventId { get; set; }

    public int Type { get; set; }

    public int QuantityAvaible { get; set; }

    public int QuantitySold { get; set; }

    public decimal? Price { get; set; }

    public int? UserId { get; set; }

    [JsonIgnore]
    public virtual ICollection<Attendee> Attendees { get; set; } = new List<Attendee>();

    [JsonIgnore]
    public virtual Event? Event { get; set; }

    [JsonIgnore]
    public virtual ICollection<TicketOrder> TicketOrders { get; set; } = new List<TicketOrder>();

    [JsonIgnore]
    public virtual User? User { get; set; }
}
