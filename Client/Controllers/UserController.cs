using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class UserController : Controller
{
	public UserController()
	{
	}

	public IActionResult Profile()
	{
		return View();
	}

    public IActionResult ChangePassword()
    {
        return View();
    }

    public IActionResult List()
	{
		return View();
	}

    public IActionResult Create()
	{
		return View();
	}
}
