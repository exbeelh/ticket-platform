namespace Server.ViewModels
{
    public class RegisterVM
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Picture { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Website { get; set; }
        public string Address { get; set; } = null!;
        public string City { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public string State { get; set; } = null!;
        public string CountryId { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int Role { get; set; }
    }
}
