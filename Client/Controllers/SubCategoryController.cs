using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class SubCategoryController : Controller
{
	public SubCategoryController()
	{
	}

	public IActionResult Index()
	{
		return View();
	}
}
