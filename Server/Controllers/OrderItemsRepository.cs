﻿using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsRepository : BaseController<IOrderItemRepository, OrderItem, int>
    {
        public OrderItemsRepository(IOrderItemRepository repository) : base(repository)
        {
        }
    }
}
