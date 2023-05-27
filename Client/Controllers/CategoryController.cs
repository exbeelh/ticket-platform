using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "Admin")]
public class CategoryController : Controller
{
	public CategoryController()
	{
	}

	public IActionResult Index()
	{
		return View();
	}
}
