using Server.Data;
using Server.Models;
using Server.ViewModels;
using Server.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace Server.Repository.Data
{
    public class OrganizerRepository : GeneralRepository<Organizer, int, MyContext>, IOrganizerRepository
    {
        private readonly IFileRepository _fileRepository;

        public OrganizerRepository(MyContext context, IFileRepository fileRepository) : base(context)
        {
            _fileRepository = fileRepository;
        }

        public async Task<Organizer> GetByUserId(int id)
        {
            var getOrganizers = await GetAllAsync();
            var data = getOrganizers.Where(x => x.UserId == id).FirstOrDefault();
            return data!;
        }

        public async Task<int> UpdateOrganizer(OrganizerVM organizer)
        {
            var getOrganizers = await GetByUserId(organizer.Id);
            getOrganizers.Name = organizer.Name;
            getOrganizers.Description = organizer.Description;
            getOrganizers.DescriptionStatus = organizer.DescriptionStatus;
            getOrganizers.Link = organizer.Link;
            getOrganizers.Status = organizer.Status;
            getOrganizers.Facebook = organizer.Facebook;
            getOrganizers.Twitter = organizer.Twitter;
            getOrganizers.Image = await _fileRepository.SaveImageAsync(organizer.ImageFile!) ?? getOrganizers.Image;
            _context.Entry(getOrganizers).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
    }
}
