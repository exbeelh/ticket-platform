using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

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
