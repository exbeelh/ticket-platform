using Server.Models;
using System.Text.Json.Serialization;

namespace Server.ViewModels
{
    public class BookingVM
    {
        public int Id { get; set; }

        public string TransactionId { get; set; } = null!;

        public int? EventId { get; set; }

        public int? OrderStatusId { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal BookingFee { get; set; }

        public decimal Amount { get; set; }

        public int? UserId { get; set; }

        public int? IsPayment { get; set; }

        public int? IsCanceled { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        public virtual ICollection<TicketOrder> TicketOrders { get; set; } = new List<TicketOrder>();

        public virtual Event? Event { get; set; }
        public virtual User? User { get; set; }
    }
}
