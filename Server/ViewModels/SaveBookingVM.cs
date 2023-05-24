using Server.Models;

namespace Server.ViewModels
{
    public class SaveBookingVM
    {
        public int OrderId { get; set; }

        public virtual ICollection<Attendee> Attendees { get; set; } = new List<Attendee>();
    }
}
