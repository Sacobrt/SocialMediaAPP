using AutoMapper;
using SocialMediaAPP.Data;
using SocialMediaAPP.Models;
using SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SocialMediaAPP.Controllers
{
    /// <summary>
    /// API Controller for managing users in the social media application.
    /// Provides CRUD operations, image management, and pagination functionalities for users.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : SocialMediaController
    {
        public UserController(SocialMediaContext context, IMapper mapper) : base(context, mapper) { }

        /// <summary>
        /// Retrieves all users from the database.
        /// </summary>
        /// <returns>A list of UserDTORead objects representing all users.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<UserDTORead>), 200)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public ActionResult<List<UserDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Retrieve all users and map to DTOs
                return Ok(_mapper.Map<List<UserDTORead>>(_context.Users));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a specific user by ID.
        /// </summary>
        /// <param name="id">The unique identifier of the user to retrieve.</param>
        /// <returns>A UserDTORead object representing the user if found.</returns>
        [HttpGet("{id:int}")]
        public ActionResult<UserDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            User? e;
            try
            {
                // Find user by ID
                e = _context.Users.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "User cannot be found!" });
            }
            return Ok(_mapper.Map<UserDTORead>(e));
        }

        /// <summary>
        /// Creates a new user in the system and also creates a corresponding operator record.
        /// Checks if the user with the same email or username already exists.
        /// </summary>
        /// <param name="dto">The UserDTOInsertUpdate object containing user details for the new user.</param>
        /// <returns>A status code indicating success or failure.</returns>
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(typeof(UserDTORead), 201)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult Post(UserDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            try
            {
                // Check if a user with the same email or username already exists
                var existingUser = _context.Users.FirstOrDefault(u => u.Email == dto.Email || u.Username == dto.Username);
                if (existingUser != null)
                {
                    return BadRequest(new { message = "A user with the same email or username already exists." });
                }

                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                var user = _mapper.Map<User>(dto);
                user.Password = hashedPassword;

                _context.Users.Add(user);
                _context.SaveChanges();

                var operatorEntity = new Operator
                {
                    Email = user.Email,
                    Password = hashedPassword,
                    UserId = user.ID,
                    User = user
                };

                _context.Operators.Add(operatorEntity);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, _mapper.Map<UserDTORead>(user));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Updates an existing user by ID and updates or creates the corresponding operator record if applicable.
        /// Checks if the email or username already exists for another user.
        /// </summary>
        /// <param name="id">The unique identifier of the user to update.</param>
        /// <param name="dto">The UserDTOInsertUpdate object containing updated user details.</param>
        /// <returns>A status code indicating success or failure.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, UserDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                User? user = _context.Users.Find(id);
                if (user == null)
                {
                    return NotFound(new { message = "User cannot be found!" });
                }

                // Check if another user with the same email or username exists
                var existingUser = _context.Users.FirstOrDefault(u => (u.Email == dto.Email || u.Username == dto.Username) && u.ID != id);

                if (existingUser != null)
                {
                    return BadRequest(new { message = "A user with the same email or username already exists." });
                }

                // Hash the password if it's provided in the dto (if you're allowing password updates)
                if (!string.IsNullOrEmpty(dto.Password))
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                }

                // Map the other updated fields from the DTO to the user entity
                _mapper.Map(dto, user);
                _context.Users.Update(user);
                _context.SaveChanges();

                // Check if the operator record exists
                var operatorEntity = _context.Operators.FirstOrDefault(o => o.UserId == id);

                if (operatorEntity != null)
                {
                    operatorEntity.Email = user.Email;
                    if (!string.IsNullOrEmpty(dto.Password))
                    {
                        operatorEntity.Password = user.Password;
                    }
                    _context.Operators.Update(operatorEntity);
                }
                else
                {
                    var newOperator = new Operator
                    {
                        Email = user.Email,
                        Password = user.Password,
                        UserId = user.ID,
                        User = user
                    };
                    _context.Operators.Add(newOperator);
                }

                _context.SaveChanges();

                return Ok(new { message = "Successfully updated!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Deletes a user by ID if the user has no posts, comments, or followers.
        /// Also deletes the corresponding Operator record.
        /// </summary>
        /// <param name="id">The unique identifier of the user to delete.</param>
        /// <returns>A status code indicating success or failure.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                User? user = _context.Users.Find(id);
                if (user == null)
                {
                    return NotFound(new { message = "User cannot be found!" });
                }

                bool hasPosts = _context.Posts.Any(p => p.User.ID == id);
                bool hasComments = _context.Comments.Any(c => c.User.ID == id);
                bool hasFollowers = _context.Followers.Any(f => f.User.ID == id || f.FollowerUser.ID == id);

                if (hasPosts || hasComments || hasFollowers)
                {
                    return BadRequest(new { message = "Cannot delete user with posts, comments, or followers." });
                }

                var operatorEntity = _context.Operators.FirstOrDefault(o => o.UserId == id);
                if (operatorEntity != null)
                {
                    _context.Operators.Remove(operatorEntity);
                }

                _context.Users.Remove(user);
                _context.SaveChanges();

                return Ok(new { message = "User deleted successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Updates the profile image of a user by their ID.
        /// </summary>
        /// <param name="id">The unique identifier of the user to update the image for.</param>
        /// <param name="image">The ImageDTO containing the Base64 encoded image.</param>
        /// <returns>A status code indicating success or failure.</returns>
        [HttpPut("setImage/{id:int}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public IActionResult SetImage(int id, ImageDTO image)
        {
            if (id <= 0)
            {
                return BadRequest(new { message = "ID needs to be higher than zero (0)" });
            }
            if (string.IsNullOrEmpty(image.Base64))
            {
                return BadRequest(new { message = "Image not uploaded!" });
            }

            // Find the user by ID
            var u = _context.Users.Find(id);
            if (u == null)
            {
                return BadRequest(new { message = $"There is no user with ID {id}." });
            }

            try
            {
                // Define the directory path to save the image
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory() + ds + "wwwroot" + ds + "images" + ds + "users");
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                // Save the image as a PNG file
                var path = Path.Combine(dir + ds + id + ".png");
                System.IO.File.WriteAllBytes(path, Convert.FromBase64String(image.Base64));

                return Ok(new { message = "Image changed successfully!" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Retrieves paginated users based on the page number and optional search condition.
        /// Allows filtering by username, first name, or last name.
        /// </summary>
        /// <param name="page">The page number to retrieve. (Starting from 1)</param>
        /// <param name="condition">Optional search condition to filter users by name or username.</param>
        /// <returns>A paginated list of users matching the condition.</returns>
        [HttpGet("pagination/{page}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult Pagination(int page, string condition = "")
        {
            var perPage = 20; // Number of users per page
            condition = condition.ToLower();
            try
            {
                // Filter and paginate the users
                var users = _context.Users
                    .Where(u => EF.Functions.Like(u.Username.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(u.FirstName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(u.LastName.ToLower(), "%" + condition + "%"))
                    .OrderByDescending(u => u.CreatedAt)
                    .ThenBy(u => u.Username)
                    .Skip((perPage * page) - perPage)
                    .Take(perPage)
                    .ToList();

                return Ok(_mapper.Map<List<UserDTORead>>(users));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Generates a specified number of random user accounts with randomized creation dates from the last 30 days.
        /// </summary>
        /// <param name="amount">The number of users to generate (between 1 and 500).</param>
        /// <returns>
        /// A success message and a list of the generated users with their details, or a `400 Bad Request` if the amount is invalid.
        /// </returns>
        [HttpGet("generate/{amount}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult Generate(int amount)
        {
            if (amount < 1 || amount > 500)
            {
                return BadRequest(new { message = "The amount must be between 1 and 500." });
            }

            List<User> generatedUsers = [];
            Random random = new();

            for (int i = 0; i < amount; i++)
            {
                string rawPassword = Faker.Name.Middle();
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(rawPassword);

                // Generate a random timespan between 0 and 30 days
                int randomDays = random.Next(0, 31);
                DateTime randomizedCreatedAt = DateTime.Now.AddDays(-randomDays);

                // Generate a new User
                var user = new User()
                {
                    Username = Faker.Internet.UserName(),
                    Password = hashedPassword,
                    Email = Faker.Internet.Email(),
                    FirstName = Faker.Name.First(),
                    LastName = Faker.Name.Last(),
                    BirthDate = Faker.Identification.DateOfBirth(),
                    CreatedAt = randomizedCreatedAt
                };

                // Add the user to the context
                _context.Users.Add(user);
                _context.SaveChanges();
                generatedUsers.Add(user);
            }

            // Return a list of the generated users with relevant details
            var result = generatedUsers.Select(user => new
            {
                user.ID,
                user.Username,
                user.Email,
                user.FirstName,
                user.LastName,
                user.BirthDate,
                user.CreatedAt
            });

            // Return success message and generated user details
            return Ok(new { message = $"{amount} users generated successfully.", users = result });
        }
    }
}
