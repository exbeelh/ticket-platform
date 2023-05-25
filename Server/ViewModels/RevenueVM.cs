namespace Server.ViewModels
{
    public class RevenueVM
    {
        public string TicketName { get; set; }
        public int OrderId { get; set; }
        public int? Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal? TotalPrice { get; set; }
        public decimal Commission { get; set; }
        public decimal? FinalAmount { get; set; }
    }
}
