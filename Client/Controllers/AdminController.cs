using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class AdminController : Controller
{
	public AdminController()
	{
	}

	public IActionResult Index()
	{
		return View();
	}
}
