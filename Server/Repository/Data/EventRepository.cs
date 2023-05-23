using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModel;

namespace Server.Repository.Data
{
    public class EventRepository : GeneralRepository<Event, int, MyContext>, IEventRepository
    {

        public EventRepository(MyContext context) : base(context)
        {
        }

        public async Task<IEnumerable<EventVM>> Aprove()
        {
            var filteredEvents = from events in _context.Events
                                 join category in _context.Categories on events.CategoryId equals category.Id
                                 where events.StatusId == 1
                                 select new EventVM
                                 {
                                     Title = events.Title,
                                     Type = events.Type,
                                     Slug = events.Slug,
                                     Category = category.Name,
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

        public async Task<IEnumerable<EventVM>> Ban()
        {
            var filteredEvents = from events in _context.Events
                                 join category in _context.Categories on events.CategoryId equals category.Id
                                 where events.StatusId == 2
                                 select new EventVM
                                 {
                                     Title = events.Title,
                                     Type = events.Type,
                                     Slug = events.Slug,
                                     Category = category.Name,
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

        public async Task<EventTicketVM> Ticket(int id)
        {
            var data = from events in _context.Events
                       join ticket in _context.Tickets on events.Id equals ticket.EventId
                       where events.Id == id
                       select new EventTicketVM
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
                           Address = events.Address,
                           TicketList = (from tickets in _context.Tickets
                                         where ticket.Id == events.Id
                                         select ticket).ToList()
                       };

            return await data.FirstOrDefaultAsync();
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
                                     Category = category.Name,
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
            var filteredEvents = from events in _context.Events
                                 join category in _context.Categories on events.CategoryId equals category.Id
                                 where events.Title.Contains(query) || events.Description!.Contains(query)
                                 select new EventVM
                                 {
                                     Title = events.Title,
                                     Type = events.Type,
                                     Slug = events.Slug,
                                     Category = category.Name,
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

        public async Task<IEnumerable<EventVM>> Upcoming()
        {
            var dateNow = DateTime.Now;

            var filteredEvents = from events in _context.Events
                                 join category in _context.Categories on events.CategoryId equals category.Id
                                 where events.StartDate > DateTime.Now && events.StatusId == 1
                                 select new EventVM
                                 {
                                     Title = events.Title,
                                     Type = events.Type,
                                     Slug = events.Slug,
                                     Category = category.Name,
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
    }
}
