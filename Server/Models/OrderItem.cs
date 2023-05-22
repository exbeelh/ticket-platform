using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class OrderItem
{
    public int Id { get; set; }

    public int? Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal UnitBookingFee { get; set; }

    public int? OrderId { get; set; }

    [JsonIgnore]
    public virtual Order? Order { get; set; }
}
