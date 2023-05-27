using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemsController : BaseController<IOrderItemRepository, OrderItem, int>
    {
        public OrderItemsController(IOrderItemRepository repository) : base(repository)
        {
        }
    }
}
