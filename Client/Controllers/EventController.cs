using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class EventController : Controller
{
	public EventController()
	{
	}

	public IActionResult Index()
	{
		return View();
	}

	public IActionResult Create()
	{
		return View();
	}

    public IActionResult Detail()
    {
        return View();
    }

    public IActionResult Manage()
    {
        return View();
    }

    public IActionResult Dashboard()
    {
        return View();
    }

    public IActionResult Order()
    {
        return View();
    }

    public IActionResult OrderTicket()
    {
        return View();
    }

    public IActionResult Revenue()
    {
        return View();
    }
}
