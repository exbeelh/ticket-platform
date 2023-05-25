using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class OrganizerController : Controller
{
	public OrganizerController()
	{
	}

    public IActionResult Manage()
    {
        return View();
    }

    public IActionResult List()
    {
        return View();
    }
}
