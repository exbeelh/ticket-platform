using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public string? FileImg { get; set; }

    public int? Status { get; set; }

    public DateTime? PaymentAt { get; set; }

    public int? SendBy { get; set; }

    public DateTime? CheckAt { get; set; }

    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
