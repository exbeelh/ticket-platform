using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Base;
using Server.Handlers.Contracts;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModel;
using System.Net;
using System.Security.Claims;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : BaseController<IAccountRepository, Account, int>
    {
        private readonly ITokenService _tokenService;

        public AccountsController(IAccountRepository repository, ITokenService tokenService) : base(repository)
        {
            _tokenService = tokenService;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<ActionResult> Register(RegisterVM registerVM)
        {
            try
            {
                var result = await _repository.Register(registerVM);

                if (result == 0)
                {
                    return Conflict(new
                    {
                        code = StatusCodes.Status409Conflict,
                        status = HttpStatusCode.Conflict.ToString(),
                        message = "Data fail to Insert!"
                    });
                }

                return Ok(new
                {
                    code = StatusCodes.Status200OK,
                    status = HttpStatusCode.OK.ToString(),
                    message = "Register Succesfully!"
                });
            }
            catch
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    message = "Something Wrong!"
                });
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginVM loginVM)
        {
            try
            {
                var result = await _repository.Login(loginVM);

                if (result is false)
                {
                    return BadRequest(new
                    {
                        code = StatusCodes.Status400BadRequest,
                        status = HttpStatusCode.BadRequest.ToString(),
                        message = "Account Email or Password Does not Match!"
                    });
                }

                var userdata = await _repository.GetUserDataAsync(loginVM.Email);

                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Email, userdata.Email),
                    new Claim(ClaimTypes.Name, userdata.Email),
                    new Claim(ClaimTypes.NameIdentifier, userdata.FullName),
                    new Claim(ClaimTypes.NameIdentifier, userdata.Id.ToString())
                };

                var getRoles = await _repository.GetRoleByEmailAsync(loginVM.Email);
                foreach (var item in getRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, item));
                }

                var accessToken = _tokenService.GenerateAccessToken(claims);
                var refreshToken = _tokenService.GenerateRefreshToken();

                // await _repository.UpdateToken(userdata.Email, refreshToken, DateTime.Now.AddDays(1));

                var generatedToken = new TokenResponseVM
                {
                    Token = accessToken,
                    RefreshToken = refreshToken,
                    TokenType = "Bearer"
                };

                return Ok(new
                {
                    code = StatusCodes.Status200OK,
                    status = HttpStatusCode.OK.ToString(),
                    message = "Login Succesfully!",
                    data = generatedToken
                });
            }
            catch
            {
                return BadRequest(new
                {
                    code = StatusCodes.Status400BadRequest,
                    status = HttpStatusCode.BadRequest.ToString(),
                    message = "Something Wrong!"
                });
            }
        }
    }
}
