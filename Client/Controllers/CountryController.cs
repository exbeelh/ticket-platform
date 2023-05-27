using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "Admin")]
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
