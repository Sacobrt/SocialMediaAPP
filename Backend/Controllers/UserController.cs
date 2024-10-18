using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Controllers
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
        /// Creates a new user in the system.
        /// </summary>
        /// <param name="dto">The UserDTOInsertUpdate object containing user details for the new user.</param>
        /// <returns>A status code indicating success or failure.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(UserDTORead), 200)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult Post(UserDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Map DTO to User model and save the new user
                var e = _mapper.Map<User>(dto);
                _context.Users.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<UserDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Updates an existing user by ID.
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
                // Find the user by ID and map the updated data
                User? e = _context.Users.Find(id);
                if (e == null)
                {
                    return NotFound(new { message = "User cannot be found!" });
                }

                e = _mapper.Map(dto, e);

                // Update the user in the database
                _context.Users.Update(e);
                _context.SaveChanges();

                return Ok(new { message = "Successfully changed!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Deletes a user by ID.
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
                // Find the user by ID
                User? e = _context.Users.Find(id);
                if (e == null)
                {
                    return NotFound(new { message = "User cannot be found!" });
                }

                // Remove the user from the database
                _context.Users.Remove(e);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted!" });
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
            var perPage = 12; // Number of users per page
            condition = condition.ToLower();
            try
            {
                // Filter and paginate the users
                var users = _context.Users
                    .Where(u => EF.Functions.Like(u.Username.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(u.FirstName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(u.LastName.ToLower(), "%" + condition + "%"))
                    .OrderBy(u => u.Username)
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
    }
}
