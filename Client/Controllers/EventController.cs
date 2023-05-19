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
}
