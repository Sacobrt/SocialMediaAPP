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
                    .Include(u => u.FollowerUser)
                    .Where(u => EF.Functions.Like(u.User.Username.ToLower(), "%" + condition + "%"))
                    .Where(u => EF.Functions.Like(u.User.FirstName.ToLower(), "%" + condition + "%"))
                    .Where(u => EF.Functions.Like(u.User.LastName.ToLower(), "%" + condition + "%"))
                    .OrderByDescending(u => u.FollowedAt)
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

        /// <summary>
        /// Retrieves the follow statuses of a list of users for the specified current user.
        /// </summary>
        /// <param name="currentUserId">The ID of the current user for whom the follow statuses are being checked.</param>
        /// <param name="followedUserIds">
        /// A comma-separated string of user IDs representing the users the current user may follow.
        /// </param>
        /// <returns>
        /// An IActionResult containing a dictionary where each key is a user ID from the provided list,
        /// and the value is an object indicating if the current user is following that user and the follower's ID if applicable.
        /// </returns>
        /// <response code="200">Returns a dictionary containing follow statuses for the specified users.</response>
        /// <response code="400">If the followedUserIds parameter is missing or improperly formatted.</response>
        /// <remarks>
        /// This endpoint expects a valid comma-separated string of followed user IDs in the query parameter.
        /// If the string is empty or improperly formatted, the API will respond with a BadRequest (400).
        /// The method checks which users from the provided list the current user follows, and returns
        /// a dictionary where each entry contains a boolean `isFollowing` flag and the follower's ID.
        /// </remarks>
        [HttpGet("statuses/{currentUserId}")]
        [ProducesResponseType(typeof(string), 400)]
        public IActionResult GetFollowStatuses(int currentUserId, [FromQuery] string followedUserIds)
        {
            if (string.IsNullOrWhiteSpace(followedUserIds))
            {
                return BadRequest(new { message = "Followed user IDs are required." });
            }

            List<int> followedUserIdList;
            try
            {
                followedUserIdList = followedUserIds.Split(',').Select(id => int.Parse(id.Trim())).ToList();
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid format for followed user IDs. Please provide a comma-separated list of integers." });
            }

            // Fetch followers with FollowerUser eagerly loaded
            var followStatuses = _context.Followers
                .Include(f => f.FollowerUser) // Ensure FollowerUser is included
                .Where(f => f.User.ID == currentUserId && followedUserIdList.Contains(f.FollowerUser.ID))
                .ToList();

            // Create a dictionary to store the results
            var result = followedUserIdList.ToDictionary(
                id => id,
                id =>
                {
                    var follower = followStatuses.FirstOrDefault(f => f.FollowerUser?.ID == id);
                    return new // Explicitly create a new anonymous type
                    {
                        isFollowing = follower != null,
                        followerId = follower?.ID
                    };
                }
            );

            return Ok(result);
        }

        /// <summary>
        /// Generates a specified number of random follower relationships between users.
        /// </summary>
        /// <param name="amount">The number of follower relationships to generate (between 1 and 500).</param>
        /// <returns>
        /// A success message and a list of the generated follower relationships, or a `400 Bad Request` if the amount is invalid.
        /// </returns>
        [HttpGet("generate/{amount}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult GenerateFollowers(int amount)
        {
            if (amount < 1 || amount > 500)
            {
                return BadRequest(new { message = "The amount must be between 1 and 500." });
            }

            List<Follower> generatedFollowers = new List<Follower>();
            var users = _context.Users.ToList();

            if (users.Count < 2)
            {
                return BadRequest(new { message = "Not enough users in the system to create follower relationships." });
            }

            var random = new Random();

            for (int i = 0; i < amount; i++)
            {
                // Select random users for follower relationships
                User user = users[random.Next(users.Count)];
                User followerUser;

                do
                {
                    followerUser = users[random.Next(users.Count)];
                } while (user.ID == followerUser.ID || _context.Followers.Any(f => f.User.ID == user.ID && f.FollowerUser.ID == followerUser.ID));

                // Create new follower relationship
                var follower = new Follower()
                {
                    User = user,
                    FollowerUser = followerUser,
                    FollowedAt = DateTime.Now
                };

                // Add the follower relationship to the context
                _context.Followers.Add(follower);
                _context.SaveChanges();
                generatedFollowers.Add(follower);
            }

            // Return a list of the generated follower relationships with relevant details
            var result = generatedFollowers.Select(f => new
            {
                UserId = f.User.ID,
                Username = f.User.Username,
                FollowerUserId = f.FollowerUser.ID,
                FollowerUsername = f.FollowerUser.Username,
                FollowedAt = f.FollowedAt
            });

            return Ok(new { message = $"{amount} follower relationships generated successfully.", followers = result });
        }
    }
}
