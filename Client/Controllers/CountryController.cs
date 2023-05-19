using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class CountryController : Controller
{
	public CountryController()
	{
	}

	public IActionResult Index()
	{
		return View();
	}
}
