namespace Server.ViewModels
{
    public class ProfileVM
    {
        public int Id { get; set; }
        public string Firstname { get; set; } = null!;
        public string? Lastname { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Website { get; set; }
        public string? Address { get; set; }
        public string City { get; set; } = null!;
        public string? PostalCode { get; set; }
        public string? State { get; set; }
        public string? CountryId { get; set; }
        public IFormFile? PictureFile { get; set; }
    }
}
