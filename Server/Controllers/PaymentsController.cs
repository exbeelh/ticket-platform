using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    public class PaymentsController : BaseController<IPaymentRepository, Payment, int>
    {
        public PaymentsController(IPaymentRepository repository) : base(repository)
        {
        }
    }
}
