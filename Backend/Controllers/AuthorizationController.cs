using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CSHARP_SocialMediaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly SocialMediaContext _context;
        private readonly IMapper _mapper;

        public AuthorizationController(SocialMediaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("token")]
        public IActionResult GenerateToken(OperatorDTO opt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var optDb = _context.Operators.Include(o => o.User).FirstOrDefault(p => p.Email == opt.Email);

            if (optDb == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "You are not authorized, I cannot find the operator!");
            }

            if (!BCrypt.Net.BCrypt.Verify(opt.Password, optDb.Password))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "You are not authorized, the password does not match!");
            }

            var userInfo = _mapper.Map<UserDTORead>(optDb?.User);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("TNm2s38axo4UIHsUwcvvmTuJRprFrGGodpyItWoDrZwTj21tqVTuJRprFrGGodpyItWoDrZwTj21tqVUwcvvmTuJRprFrGGodpyItWoDrZ");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, optDb.Email ?? string.Empty),
                new Claim("UserID", optDb.UserId.ToString() ?? string.Empty),
                new Claim("Username", optDb.User?.Username ?? string.Empty),
                new Claim("FirstName", optDb.User?.FirstName ?? string.Empty),
                new Claim("LastName", optDb.User?.LastName ?? string.Empty),
                new Claim("Image", userInfo.Image ?? string.Empty)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(new { token = jwt, user = userInfo });
        }
    }
}
