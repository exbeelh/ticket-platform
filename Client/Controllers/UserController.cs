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

    [HttpGet("/Admin/User/List")]
    public IActionResult List()
	{
		return View();
	}
}
