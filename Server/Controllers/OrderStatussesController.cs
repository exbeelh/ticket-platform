using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatussesController : BaseController<IOrderStatusRepository, OrderStatus, int>
    {
        public OrderStatussesController(IOrderStatusRepository repository) : base(repository)
        {
        }
    }
}
