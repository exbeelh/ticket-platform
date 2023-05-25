using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Repository.Data
{
    public class EventRepository : GeneralRepository<Event, int, MyContext>, IEventRepository
    {

        private readonly ICategoryRepository _categoryRepository;
        private readonly ITicketRepository _ticketRepository;
        private readonly IOrganizerRepository _organizerRepository;
        private readonly IFileRepository _fileRepository;

        public EventRepository(MyContext context, ICategoryRepository categoryRepository, ITicketRepository ticketRepository, IOrganizerRepository organizerRepository, IFileRepository fileRepository) : base(context)
        {
            _categoryRepository = categoryRepository;
            _ticketRepository = ticketRepository;
            _organizerRepository = organizerRepository;
            _fileRepository = fileRepository;
        }

        public async Task<IEnumerable<EventVM>> Aprove()
        {
            var getEvents = await GetAllAsync();
            var getCategories = await _categoryRepository.GetAllAsync();

            var filteredEvents = from events in getEvents
                                 join category in getCategories on events.CategoryId equals category.Id
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

            return filteredEvents.ToList();
        }

        public async Task<IEnumerable<EventVM>> Ban()
        {
            var getEvents = await GetAllAsync();
            var getCategories = await _categoryRepository.GetAllAsync();

            var filteredEvents = from events in getEvents
                                 join category in getCategories on events.CategoryId equals category.Id
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

            return filteredEvents.ToList();
        }

        public async Task<IEnumerable<Ticket?>> Ticket(int id)
        {
            var getTickets = await _ticketRepository.GetAllAsync();
            var getEvent = await GetByIdAsync(id);

            var filteredTickets = getTickets.Where(t => t.EventId == getEvent!.Id).ToList();

            return filteredTickets;
        }

        public async Task<IEnumerable<EventVM>> Category(int id)
        {
            var getEvents = await GetAllAsync();
            var getCategories = await _categoryRepository.GetAllAsync();

            var filteredEvents = from events in getEvents
                                 join category in getCategories on events.CategoryId equals category.Id
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

            return filteredEvents.ToList();
        }

        public async Task<IEnumerable<EventVM>> Search(string query)
        {
            var getEvents = await GetAllAsync();
            var getCategories = await _categoryRepository.GetAllAsync();

            var filteredEvents = from events in getEvents
                                 join category in getCategories on events.CategoryId equals category.Id
                                 where events.Title.Contains(query, StringComparison.OrdinalIgnoreCase)
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

            return filteredEvents.ToList();

        }

        public async Task<IEnumerable<EventVM>> Upcoming()
        {
            var getEvents = await GetAllAsync();
            var getCategories = await _categoryRepository.GetAllAsync();

            var dateNow = DateTime.Now;

            var filteredEvents = from events in getEvents
                                 join category in getCategories on events.CategoryId equals category.Id
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

            return filteredEvents.ToList();
        }

        public async Task<IEnumerable<EventVM>> Featured()
        {
            var getEvents = await GetAllAsync();
            var getCategories = await _categoryRepository.GetAllAsync();

            var filteredEvents = from events in getEvents
                                 join category in getCategories on events.CategoryId equals category.Id
                                 where events.Views > getEvents.Average(e => e.Views)
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

            return filteredEvents.ToList();
        }

        public async Task<Event> Detail(string slug)
        {
            var getEvents = await GetAllAsync();

            var data = (from events in getEvents
                        where events.Slug == slug
                        select events).FirstOrDefault();

            return data!;

        }

        public async Task<int> RequestEvent(RequestEventVM requestEventVM)
        {
            await using var transaction = _context.Database.BeginTransaction();
            try
            {
                var getOrganizer = await _organizerRepository.GetByUserId(requestEventVM.UserId);

                var insertEvent = await InsertAsync(new Event()
                {
                    Title = requestEventVM.Title,
                    Slug = requestEventVM.Slug,
                    Type = requestEventVM.Type,
                    StartDate = requestEventVM.StartDate,
                    EndDate = requestEventVM.EndDate,
                    StartTime = requestEventVM.StartTime,
                    EndTime = requestEventVM.EndTime,
                    Image = await _fileRepository.SaveImageAsync(requestEventVM.ImageFile!),
                    Description = requestEventVM.Description,
                    Address = requestEventVM.Address,
                    CategoryId = requestEventVM.CategoryId,
                    Link = requestEventVM.Link,
                    Note = requestEventVM.Note,
                    IsPublish = requestEventVM.IsPublish,
                    UserId = requestEventVM.UserId,
                    StatusId = 0,
                    OrganizerId = getOrganizer.Id,
                    Views = 0
                });

                foreach (var ticket in requestEventVM.Tickets)
                {
                    await _ticketRepository.InsertAsync(new Ticket()
                    {
                        EventId = insertEvent!.Id,
                        Name = ticket.Name,
                        Type = ticket.Type,
                        QuantityAvailable = ticket.QuantityAvailable,
                        QuantitySold = ticket.QuantitySold,
                        Price = ticket.Price,
                        UserId = requestEventVM.UserId
                    });
                }

                await transaction.CommitAsync();
                return 1;
            }
            catch
            {
                await transaction.RollbackAsync();
                return 0;
            }
        }

    }
}
