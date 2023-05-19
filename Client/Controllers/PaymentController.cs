using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class PaymentController : Controller
{
	public PaymentController()
	{
	}

    public IActionResult Approve()
    {
        return View();
    }
}
