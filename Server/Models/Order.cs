using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Order
{
    public int Id { get; set; }

    public string TransationId { get; set; } = null!;

    public int EventId { get; set; }

    public int OrderStatusId { get; set; }

    public DateTime OrderDate { get; set; }

    public decimal BookingFee { get; set; }

    public decimal Amount { get; set; }

    public int? UserId { get; set; }

    public int? IsPayment { get; set; }

    public int? IsCanceled { get; set; }

    public int? PaymentId { get; set; }

    public virtual ICollection<Atendee> Atendees { get; set; } = new List<Atendee>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual OrderStatuss OrderStatus { get; set; } = null!;

    public virtual Payment? Payment { get; set; }

    public virtual ICollection<TicketOrder> TicketOrders { get; set; } = new List<TicketOrder>();
}
