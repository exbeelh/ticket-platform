using Server.Models;

namespace Server.ViewModels
{
    public class OrderTicketVM
    {
        public int EventId { get; set; }
        public decimal BookingFee { get; set; }
        public decimal Amount { get; set; }
        public int UserId { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<TicketOrder> TicketOrders { get; set; }
    }
}
