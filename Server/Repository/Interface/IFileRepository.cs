using Server.Models;

namespace Server.Repository.Interface;

public interface IFileRepository
{
   Task<string> SaveImageAsync(IFormFile imageFile);
}
