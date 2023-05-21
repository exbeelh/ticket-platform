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
            var getEvent = await GetAllAsync();

            var getApprove = getEvent
                .Where(e => e.StatusId == 1)
                .Select(e => new EventVM
                {
                    Title = e.Title,
                    Type = e.Type,
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

        public Task<IEnumerable<EventVM>> Cancel(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EventVM>> Category()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EventVM>> Payment(int id)
        {
            throw new NotImplementedException();
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

            var getUpcoming = getEvent.Where(e => e.StartDate > dateNow).Select(e => new EventVM
            {
                Title = e.Title,
                Type = e.Type,
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
