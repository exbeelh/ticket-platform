using Server.Models;

namespace Server.ViewModels
{
    public class RegisterVM
    {
        public string FirstName { get; set; } = null!;
        public string? LastName { get; set; }
        public string Email { get; set; } = null!;
        public string? Picture { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Website { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? State { get; set; }
        public string? CountryId { get; set; }
        public string Password { get; set; } = null!;
        public int Role { get; set; }
        public string? OrganizerName { get; set; }
        public string? OrganizerDescription { get; set; }
        public IFormFile? OrganizerImageFile { get; set; }
    }
}
