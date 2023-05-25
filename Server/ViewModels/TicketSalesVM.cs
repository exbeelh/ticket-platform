namespace Server.ViewModels
{
    public class TicketSalesVM
    {
        public int OrderId { get; set; }
        public string FullName { get; set; }
        public string TransactionId { get; set; }
        public int? Quantity { get; set; }
        public decimal Payment { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
