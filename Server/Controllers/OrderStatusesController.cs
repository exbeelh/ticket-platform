using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderStatusesController : BaseController<IOrderStatusRepository, OrderStatus, int>
    {
        public OrderStatusesController(IOrderStatusRepository repository) : base(repository)
        {
        }
    }
}
