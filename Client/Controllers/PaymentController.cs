using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "Event Organizer")]
public class PaymentController : Controller
{
    public PaymentController()
    {
    }

    public IActionResult Approve()
    {
        return View();
    }
}
