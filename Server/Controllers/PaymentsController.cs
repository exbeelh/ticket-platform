using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : BaseController<IPaymentRepository, Payment, int>
    {
        public PaymentsController(IPaymentRepository repository) : base(repository)
        {
        }
    }
}
