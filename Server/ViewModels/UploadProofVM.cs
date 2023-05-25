using Server.Models;
using System.Text.Json.Serialization;

namespace Server.ViewModels
{
    public class UploadProofVM
    {
        public int OrderId { get; set; }

        public int? UserId { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
