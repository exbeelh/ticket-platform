using System;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class AccountController : Controller
{
	public AccountController()
	{
	}

	public IActionResult Login()
	{
		return View();
	}

	public IActionResult Register()
	{
		return View();
	}
}

