namespace Server.ViewModels
{
    public class OrganizerVM
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? DescriptionStatus { get; set; }
        public string? Link { get; set; }
        public int? Status { get; set; }
        public string? Facebook { get; set; }
        public string? Twitter { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
