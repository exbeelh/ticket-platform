﻿using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Models;
using Server.Repository.Data;
using Server.Repository.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : BaseController<ITicketRepository, Ticket, int>
    {
        public TicketsController(ITicketRepository repository) : base(repository)
        {
        }
    }
}
