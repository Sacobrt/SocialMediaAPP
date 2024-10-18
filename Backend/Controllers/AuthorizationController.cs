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
    /// <summary>
    /// Handles authorization and authentication for operators by validating credentials and generating JWT tokens.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class AuthorizationController : ControllerBase
    {
        private readonly SocialMediaContext _context;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the AuthorizationController class.
        /// </summary>
        /// <param name="context">The database context used to interact with the application's data.</param>
        /// <param name="mapper">The AutoMapper instance used to map database models to DTOs.</param>
        public AuthorizationController(SocialMediaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Authenticates the operator and generates a JWT token.
        /// </summary>
        /// <param name="opt">The operator's credentials (email and password).</param>
        /// <returns>A JWT token and the authenticated user's details.</returns>
        /// <remarks>
        /// ### Example Request:
        /// 
        /// POST /api/v1/Authorization/token
        /// 
        /// ```json
        /// {
        ///   "email": "demo@demo.com",
        ///   "password": "demo"
        /// }
        /// ```
        /// 
        /// ### Example Response (200 OK):
        /// 
        /// ```json
        /// {
        ///   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        ///   "user": {
        ///     "username": "demo",
        ///     "firstName": "Demo",
        ///     "image": "/images/users/1.png"
        ///   }
        /// }
        /// ```
        /// </remarks>
        [HttpPost("token")]
        [ProducesResponseType(typeof(List<UserDTORead>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 401)]
        [ProducesResponseType(typeof(string), 403)]
        public IActionResult GenerateToken(OperatorDTO opt)
        {
            // Validate the model state.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Query the database for the operator using the provided email.
            var optDb = _context.Operators.Include(o => o.User).FirstOrDefault(p => p.Email == opt.Email);

            // If the operator is not found, return 403 Forbidden.
            if (optDb == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "You are not authorized, I cannot find the operator!");
            }

            // Verify the provided password using BCrypt.
            if (!BCrypt.Net.BCrypt.Verify(opt.Password, optDb.Password))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "You are not authorized, the password does not match!");
            }

            // Map the associated User entity to a DTO.
            var userInfo = _mapper.Map<UserDTORead>(optDb?.User);

            // Initialize the JWT token handler.
            var tokenHandler = new JwtSecurityTokenHandler();

            // The secret key used to sign the JWT. Store this securely in production.
            var key = Encoding.UTF8.GetBytes("TNm2s38axo4UIHsUwcvvmTuJRprFrGGodpyItWoDrZwTj21tqVTuJRprFrGGodpyItWoDrZwTj21tqVUwcvvmTuJRprFrGGodpyItWoDrZ");

            // Define the claims to be included in the JWT token.
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, optDb.Email ?? string.Empty),
                new Claim("UserID", optDb.UserId.ToString() ?? string.Empty),
                new Claim("Username", optDb.User?.Username ?? string.Empty),
                new Claim("FirstName", optDb.User?.FirstName ?? string.Empty),
                new Claim("LastName", optDb.User?.LastName ?? string.Empty),
                new Claim("Image", userInfo.Image ?? string.Empty)
            };

            // Create the token descriptor.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            // Generate the JWT token.
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            // Return the token and user information.
            return Ok(new { token = jwt, user = userInfo });
        }
    }
}
