﻿namespace Server.ViewModel
{
    public class EventVM
    {
        public string Title { get; set; } = null!;
        
        public int Type { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? StartTime { get; set; }

        public string? EndTime { get; set; }

        public string Image { get; set; } = null!;

        public string? Description { get; set; }

        public string? Address { get; set; }
    }
}
