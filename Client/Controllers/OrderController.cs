using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "User")]
public class OrderController : Controller
{
	public OrderController()
	{
	}

    public IActionResult Index()
    {
        return View();
    }

    [Route("/Booking/{transactionId}")]
    [Authorize(Roles = "User")]
    public IActionResult Booking()
	{
		return View();
	}

    [Route("/Pay/{transactionId}")]
    [Authorize(Roles = "User")]
    public IActionResult Payment()
	{
		return View();
	}

    [Authorize(Roles = "User")]
    public IActionResult Cancel()
	{
		return View();
	}

    [Route("/Order/Success/{transactionId}")]
    [Authorize(Roles = "User")]
    public IActionResult Success()
	{
		return View();
	}

    [Authorize(Roles = "User")]
    public IActionResult MyTicket()
	{
		return View();
	}
}
