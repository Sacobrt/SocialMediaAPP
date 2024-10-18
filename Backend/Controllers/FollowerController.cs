using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Controllers
{
    /// <summary>
    /// API Controller to manage follower relationships between users.
    /// This controller handles operations for creating, retrieving, updating, and deleting followers.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FollowerController : SocialMediaController
    {
        public FollowerController(SocialMediaContext context, IMapper mapper) : base(context, mapper) { }

        /// <summary>
        /// Retrieves all follower relationships, including users and their followers.
        /// </summary>
        /// <returns>A list of follower relationships with HTTP 200 OK status, or an error message with HTTP 400 status.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<FollowerDTORead>), 200)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public ActionResult<List<FollowerDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Retrieve all follower relationships, including user and follower data
                var followers = _context.Followers
                    .Include(g => g.User)
                    .Include(g => g.FollowerUser);

                return Ok(_mapper.Map<List<FollowerDTORead>>(followers));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a specific follower relationship by its ID.
        /// </summary>
        /// <param name="id">The ID of the follower relationship.</param>
        /// <returns>The follower relationship if found, or an error message if not found.</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public ActionResult<FollowerDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Retrieve the follower relationship by ID, including related users
                var follower = _context.Followers
                    .Include(g => g.User)
                    .Include(g => g.FollowerUser)
                    .FirstOrDefault(g => g.ID == id);

                if (follower == null)
                {
                    return NotFound(new { message = "Follower relationship not found!" });
                }

                return Ok(_mapper.Map<FollowerDTOInsertUpdate>(follower));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Creates a new follower relationship between users.
        /// </summary>
        /// <param name="dto">The DTO containing follower relationship data.</param>
        /// <returns>HTTP 201 Created if successful, or an error message if validation or creation fails.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(FollowerDTORead), 201)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public IActionResult Post(FollowerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            try
            {
                // Validate the user initiating the follow request
                var user = _context.Users.Find(dto.UserID);
                if (user == null)
                {
                    return NotFound(new { message = "User initiating the follow request not found!" });
                }

                // Validate the user being followed
                var followUser = _context.Users.Find(dto.FollowerUserID);
                if (followUser == null)
                {
                    return NotFound(new { message = "User to be followed not found!" });
                }

                // Ensure that a user cannot follow themselves
                if (user.ID == followUser.ID)
                {
                    return BadRequest(new { message = "A user cannot follow themselves!" });
                }

                // Ensure that the follower relationship does not already exist
                if (_context.Followers.Any(f => f.User.ID == dto.UserID && f.FollowerUser.ID == dto.FollowerUserID))
                {
                    return BadRequest(new { message = "Follower relationship already exists!" });
                }

                // Map the DTO to the Follower model and save the relationship
                var follower = _mapper.Map<Follower>(dto);
                follower.User = user;
                follower.FollowerUser = followUser;

                _context.Followers.Add(follower);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, _mapper.Map<FollowerDTORead>(follower));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Updates an existing follower relationship.
        /// </summary>
        /// <param name="id">The ID of the follower relationship to update.</param>
        /// <param name="dto">The updated follower data.</param>
        /// <returns>HTTP 200 OK if the update is successful, otherwise an error message.</returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(List<FollowerDTOInsertUpdate>), 200)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        [Produces("application/json")]
        public IActionResult Put(int id, FollowerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            try
            {
                // Retrieve the existing follower relationship
                var existingFollower = _context.Followers
                    .Include(g => g.User)
                    .Include(g => g.FollowerUser)
                    .FirstOrDefault(f => f.ID == id);

                if (existingFollower == null)
                {
                    return NotFound(new { message = "Follower relationship not found!" });
                }

                // Validate the user initiating the follow request
                var user = _context.Users.Find(dto.UserID);
                if (user == null)
                {
                    return NotFound(new { message = "User initiating the follow request not found!" });
                }

                // Validate the user being followed
                var followUser = _context.Users.Find(dto.FollowerUserID);
                if (followUser == null)
                {
                    return NotFound(new { message = "User to be followed not found!" });
                }

                // Ensure that a user cannot follow themselves
                if (user.ID == followUser.ID)
                {
                    return BadRequest(new { message = "A user cannot follow themselves!" });
                }

                // Ensure that the follower relationship does not already exist
                if (_context.Followers.Any(f => f.User.ID == dto.UserID && f.FollowerUser.ID == dto.FollowerUserID && f.ID != id))
                {
                    return BadRequest(new { message = "Follower relationship already exists!" });
                }

                // Update the follower relationship details
                existingFollower.User = user;
                existingFollower.FollowerUser = followUser;
                existingFollower.FollowedAt = dto.FollowedAt;

                _context.Followers.Update(existingFollower);
                _context.SaveChanges();

                return Ok(new { message = "Successfully updated!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Deletes a follower relationship by its ID.
        /// </summary>
        /// <param name="id">The ID of the follower relationship to delete.</param>
        /// <returns>HTTP 200 OK if the deletion is successful, or an error message if the follower relationship is not found.</returns>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            try
            {
                // Find the follower relationship by ID
                var follower = _context.Followers.Find(id);
                if (follower == null)
                {
                    return NotFound(new { message = "Follower relationship not found!" });
                }

                // Remove the follower relationship
                _context.Followers.Remove(follower);
                _context.SaveChanges();

                return Ok(new { message = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves paginated follower relationships, filtered by condition (e.g., username).
        /// </summary>
        /// <param name="page">The page number to retrieve.</param>
        /// <param name="condition">Optional filter condition for the search (e.g., username).</param>
        /// <returns>A paginated list of follower relationships or an error message.</returns>
        [HttpGet("pagination/{page}")]
        [ProducesResponseType(typeof(string), 400)]
        public IActionResult Pagination(int page, string condition = "")
        {
            var perPage = 6; // Number of results per page
            condition = condition.ToLower();

            try
            {
                // Filter and paginate follower relationships based on the condition (username)
                var followers = _context.Followers
                    .Include(u => u.User)
                    .Include(f => f.FollowerUser)
                    .Where(u => EF.Functions.Like(u.User.Username.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(u.FollowerUser.Username.ToLower(), "%" + condition + "%"))
                    .OrderBy(u => u.User.Username)
                    .Skip((page - 1) * perPage)
                    .Take(perPage)
                    .ToList();

                return Ok(_mapper.Map<List<FollowerDTORead>>(followers));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
