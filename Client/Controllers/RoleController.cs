using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class RoleController : Controller
{
	public RoleController()
	{
	}

	public IActionResult Index()
	{
		return View();
	}
}
