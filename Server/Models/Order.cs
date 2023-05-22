using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Order
{
    public int Id { get; set; }

    public string TransationId { get; set; } = null!;

    public int? EventId { get; set; }

    public int? OrderStatusId { get; set; }

    public DateTime OrderDate { get; set; }

    public decimal BookingFee { get; set; }

    public decimal Amount { get; set; }

    public int? UserId { get; set; }

    public int? IsPayment { get; set; }

    public int? IsCanceled { get; set; }

    [JsonIgnore]
    public virtual ICollection<Attendee> Attendees { get; set; } = new List<Attendee>();

    [JsonIgnore]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    [JsonIgnore]
    public virtual OrderStatus? OrderStatus { get; set; }

    [JsonIgnore]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    [JsonIgnore]
    public virtual ICollection<TicketOrder> TicketOrders { get; set; } = new List<TicketOrder>();

    [JsonIgnore]
    public virtual User? User { get; set; }
}
