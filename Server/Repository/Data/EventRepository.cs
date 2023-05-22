using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModel;

namespace Server.Repository.Data
{
    public class EventRepository : GeneralRepository<Event, int, MyContext>, IEventRepository
    {
        private readonly ICategoryRepository _categoryRepository;

        public EventRepository(MyContext context, ICategoryRepository categoryRepository) : base(context)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<EventVM>> Aprove()
        {
            var getEvent = await GetAllAsync();

            var getApprove = getEvent
                .Where(e => e.StatusId == 1)
                .Select(e => new EventVM
                {
                    Title = e.Title,
                    Type = e.Type,
                    Slug = e.Slug,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    StartTime = e.StartTime.ToString(),
                    EndTime = e.EndTime.ToString(),
                    Image = e.Image,
                    Description = e.Description,
                    Address = e.Address
                }).ToList();

            return getApprove!;
        }

        public async Task<IEnumerable<EventVM>> Ban()
        {
            var getEvent = await GetAllAsync();

            var getBanned = getEvent
                .Where(e => e.StatusId == 2)
                .Select(e => new EventVM
                {
                    Title = e.Title,
                    Type = e.Type,
                    Slug = e.Slug,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    StartTime = e.StartTime.ToString(),
                    EndTime = e.EndTime.ToString(),
                    Image = e.Image,
                    Description = e.Description,
                    Address = e.Address
                }).ToList();

            return getBanned!;
        }

        public async Task<IEnumerable<EventVM>> Category(int id)
        {
            var filteredEvents = from events in _context.Events
                                 join category in _context.Categories on events.CategoryId equals category.Id
                                 where events.CategoryId == id
                                 select new EventVM
                                 {
                                     Title = events.Title,
                                     Type = events.Type,
                                     Slug = events.Slug,
                                     StartDate = events.StartDate,
                                     EndDate = events.EndDate,
                                     StartTime = events.StartTime.ToString(),
                                     EndTime = events.EndTime.ToString(),
                                     Image = events.Image,
                                     Description = events.Description,
                                     Address = events.Address
                                 };

            return await filteredEvents.ToListAsync();
        }

        public async Task<IEnumerable<EventVM>> Search(string query)
        {
            var getEvent = await GetAllAsync();

            var filteredEvents = getEvent
                .Where(e => e.Title.Contains(query) || e.Description!.Contains(query))
                .Select(e => new EventVM
                {
                    Title = e.Title,
                    Type = e.Type,
                    Slug = e.Slug,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    StartTime = e.StartTime.ToString(),
                    EndTime = e.EndTime.ToString(),
                    Image = e.Image,
                    Description = e.Description,
                    Address = e.Address
                }).ToList();

            return filteredEvents;
        }

        public async Task<IEnumerable<EventVM>> Upcoming()
        {
            var getEvent = await GetAllAsync();
            var dateNow = DateTime.Now;

            var getUpcoming = getEvent.Where(e => e.StartDate > dateNow && e.StatusId == 1).Select(e => new EventVM
            {
                Title = e.Title,
                Type = e.Type,
                Slug = e.Slug,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                StartTime = e.StartTime.ToString(),
                EndTime = e.EndTime.ToString(),
                Image = e.Image,
                Description = e.Description,
                Address = e.Address
            }).ToList();

            return getUpcoming;
        }
    }
}
