using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "Admin,User,Event Organizer")]
public class UserController : Controller
{
	public UserController()
	{
	}

    [Authorize(Roles = "User,Event Organizer")]
	public IActionResult Profile()
	{
		return View();
	}

    [Authorize(Roles = "User,Event Organizer")]
	public IActionResult ChangePassword()
    {
        return View();
    }

    [Authorize(Roles = "Admin")]
	public IActionResult List()
	{
		return View();
	}

    [Authorize(Roles = "Admin")]
	public IActionResult Create()
	{
		return View();
	}
}
