using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class EventRepository : GeneralRepository<Event, int, MyContext>, IEventRepository
    {
        public EventRepository(MyContext context) : base(context)
        {
        }

        public Task<IEnumerable<Event>> Aprove(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Event>> Ban(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Event>> Cancel(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Event>> Payment(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Event>> Upcoming()
        {
            throw new NotImplementedException();
        }
    }
}
