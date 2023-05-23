﻿using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusesController : BaseController<IOrderStatusRepository, OrderStatus, int>
    {
        public OrderStatusesController(IOrderStatusRepository repository) : base(repository)
        {
        }
    }
}