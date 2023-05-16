using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class EventsController : BaseController<IEventRepository, Event, int>
    {
        public EventsController(IEventRepository repository) : base(repository)
        {
        }
    }
}
