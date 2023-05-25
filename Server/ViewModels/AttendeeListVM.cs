namespace Server.ViewModels
{
    public class AttendeeListVM
    {
        public string TransactionId { get; set; }

        public int? TicketId { get; set; }

        public string TicketName { get; set; }

        public string FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Code { get; set; }
    }
}
