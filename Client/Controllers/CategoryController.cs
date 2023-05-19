using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

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
