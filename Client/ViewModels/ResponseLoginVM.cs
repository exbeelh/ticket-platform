namespace Client.ViewModels;

public class ResponseLoginVM
{
    public string Code { get; set; }
    public string Message { get; set; }
    public TokenResponseVM? Data { get; set; }
}
