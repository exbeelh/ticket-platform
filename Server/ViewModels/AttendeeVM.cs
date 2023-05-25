namespace Server.ViewModels
{
    public class AttendeeVM
    {
        public int OrderId { get; set; }
        public string TransactionId { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public IEnumerable<AttendeeListVM> Attendees { get; set; } = null!;
    }
}
