using Server.Models;

namespace Server.ViewModels
{
    public class RequestEventVM
    {
        public string Title { get; set; } = null!;

        public string Slug { get; set; } = null!;

        public int Type { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public TimeSpan? StartTime { get; set; }

        public TimeSpan? EndTime { get; set; }

        public string Image { get; set; } = null!;

        public IFormFile? ImageFile { get; set; }

        public string? Description { get; set; }

        public string? Address { get; set; }

        public int? CategoryId { get; set; }

        public string? Link { get; set; }

        public string? Note { get; set; }

        public int IsPublish { get; set; }

        public int UserId { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
