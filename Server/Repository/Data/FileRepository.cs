using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data;

public class FileRepository : IFileRepository
{
    private MyContext context;
    private IWebHostEnvironment environment;
    public FileRepository(MyContext _Context,
        IWebHostEnvironment _environment)
    {
        context = _Context;
        environment = _environment;
    }

    public async Task<string> SaveImageAsync(IFormFile imageFile)
    {
        if (imageFile != null && imageFile.Length > 0)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(environment.WebRootPath, "images", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }
            return fileName;
        }
        return null;
    }
}
