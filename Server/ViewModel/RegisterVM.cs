namespace Server.ViewModel
{
    public class RegisterVM
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Picture { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? Website { get; set; }
        public string Password { get; set; } = null!;
    }
}
