using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "Admin")]
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
