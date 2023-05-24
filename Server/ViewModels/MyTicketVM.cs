namespace Server.ViewModels
{
    public class MyTicketVM
    {
        public int OrderId { get; set; }

        public string TransactionId { get; set; } = null!;

        public string EventName { get; set; } = null!;

        public string OrderStatusName { get; set; } = null!;

        public int? OrderStatusId { get; set; }

        public DateTime OrderDate { get; set; }
    }
}
