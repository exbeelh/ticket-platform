using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "Admin")]
public class OrderStatusController : Controller
{
	public OrderStatusController()
	{
	}

	public IActionResult Index()
	{
		return View();
	}
}
