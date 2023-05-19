using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class OrderController : Controller
{
	public OrderController()
	{
	}

    public IActionResult Index() // Order ID
    {
        return View();
    }

	public IActionResult Booking()
	{
		return View();
	}

	public IActionResult Payment()
	{
		return View();
	}

	public IActionResult Cancel() // Order ID
	{
		return View();
	}

	public IActionResult Success() // Order ID
	{
		return View();
	}

	public IActionResult MyTicket() // Order ID
	{
		return View();
	}
}
