using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "Admin,Event Organizer")]
public class OrganizerController : Controller
{
    public OrganizerController()
    {
    }

    [Authorize(Roles = "Event Organizer")]
    public IActionResult Manage()
    {
        return View();
    }

    [Authorize(Roles = "Admin")]
    public IActionResult List()
    {
        return View();
    }
}
