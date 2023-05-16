using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class AtendeesController : BaseController<IAtendeeRepository, Atendee, int>
    {
        public AtendeesController(IAtendeeRepository repository) : base(repository)
        {
        }
    }
}
