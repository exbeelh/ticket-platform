namespace Server.ViewModel
{
    public class AttendeeVM
    {
        public string TransactionId { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public decimal? Price { get; set; }
        public int quantity { get; set; }

    }
}
