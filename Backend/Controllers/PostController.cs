using AutoMapper;
using SocialMediaAPP.Data;
using SocialMediaAPP.Models;
using SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SocialMediaAPP.Controllers
{
    /// <summary>
    /// API Controller to manage user posts in the social media platform.
    /// Provides CRUD operations and pagination functionalities for posts.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PostController : SocialMediaController
    {
        public PostController(SocialMediaContext context, IMapper mapper) : base(context, mapper) { }

        /// <summary>
        /// Retrieves all posts with associated user information.
        /// </summary>
        /// <returns>A list of PostDTORead objects with HTTP 200 OK status, or an error message.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<PostDTORead>), 200)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public ActionResult<List<PostDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Retrieve the post with the associated user and comments
                var posts = _context.Posts
                                    .Include(p => p.User)          // Include user information
                                    .Include(p => p.Comments)      // Include the list of comments
                                    .ThenInclude(c => c.User)      // Include user information for each comment
                                    .ToList();

                // Map the post to PostDTORead, including nested comments
                var dtoPosts = _mapper.Map<List<PostDTORead>>(posts);

                return Ok(dtoPosts); // Return the post with associated comments
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a specific post by its ID.
        /// </summary>
        /// <param name="id">The ID of the post to retrieve.</param>
        /// <returns>
        /// A PostDTORead object with the post details if found, 
        /// or an error message if the post is not found.
        /// </returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public ActionResult<PostDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Post? e;
            try
            {
                e = _context.Posts
                            .Include(u => u.User)
                            .Include(c => c.Comments)
                            .ThenInclude(u => u.User)
                            .FirstOrDefault(p => p.ID == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "Post cannot be found!" });
            }
            return Ok(_mapper.Map<PostDTORead>(e));
        }

        /// <summary>
        /// Creates a new post and associates it with a user.
        /// </summary>
        /// <param name="dto">The PostDTOInsertUpdate object containing the post data.</param>
        /// <returns>HTTP 201 Created with the created post details if successful, otherwise an error message.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(PostDTORead), 201)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public IActionResult Post(PostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            User? es;
            try
            {
                // Find the user by UserID
                es = _context.Users.Find(dto.UserID);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { message = "User ID cannot be found!" });
            }

            try
            {
                // Map the DTO to the Post model and save the new post
                var e = _mapper.Map<Post>(dto);
                e.User = es;
                _context.Posts.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<PostDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Updates an existing post by its ID.
        /// </summary>
        /// <param name="id">The ID of the post to update.</param>
        /// <param name="dto">The PostDTOInsertUpdate object containing the updated post data.</param>
        /// <returns>HTTP 200 OK if the update is successful, otherwise an error message.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public IActionResult Put(int id, PostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Post? e;
                try
                {
                    // Find the post by ID, including associated user information
                    e = _context.Posts.Include(g => g.User).FirstOrDefault(x => x.ID == id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { message = "Post cannot be found!" });
                }

                User? es;
                try
                {
                    // Find the user by UserID
                    es = _context.Users.Find(dto.UserID);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { message = "User cannot be found!" });
                }

                // Map the updated data from the DTO to the existing post and save changes
                e = _mapper.Map(dto, e);
                e.User = es;
                _context.Posts.Update(e);
                _context.SaveChanges();

                return Ok(new { message = "Successfully changed!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Deletes a post by its ID.
        /// </summary>
        /// <param name="id">The ID of the post to delete.</param>
        /// <returns>HTTP 200 OK if the deletion is successful, otherwise an error message.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Post? e;
                try
                {
                    // Find the post by ID
                    e = _context.Posts.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { message = "Post cannot be found!" });
                }

                // Remove the post from the database
                _context.Posts.Remove(e);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves paginated posts based on the specified page number and optional filtering condition.
        /// </summary>
        /// <param name="page">The page number to retrieve.</param>
        /// <param name="condition">Optional filter condition (e.g., content, username).</param>
        /// <returns>A paginated list of PostDTORead objects with HTTP 200 OK status, or an error message.</returns>
        [HttpGet("pagination/{page}")]
        [ProducesResponseType(typeof(string), 400)]
        public IActionResult Pagination(int page, string condition = "")
        {
            var perPage = 5; // Number of posts per page
            condition = condition.ToLower();
            try
            {
                // Filter posts by condition (content, username, etc.), order by username, and paginate
                var posts = _context.Posts
                    .Include(p => p.User)
                    .Where(p => EF.Functions.Like(p.Content, "%" + condition + "%")
                        || EF.Functions.Like(p.User.Username.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.User.FirstName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.User.LastName.ToLower(), "%" + condition + "%"))
                    .OrderByDescending(p => p.CreatedAt)
                    .Skip((page - 1) * perPage)
                    .Take(perPage)
                    .ToList();

                return Ok(_mapper.Map<List<PostDTORead>>(posts));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Generates a specified number of random posts and associates them with random users in the database.
        /// Each post will have randomized content, likes, and a created date within the past 120 days.
        /// </summary>
        /// <param name="amount">The number of posts to generate. Must be between 1 and 500.</param>
        /// <returns>A list of generated posts with their details or an error message if the amount is invalid.</returns>
        /// <response code="200">Returns the list of generated posts with their details including PostID, UserID, Content, and CreatedAt date.</response>
        /// <response code="400">If the amount is not within the valid range, or if there are no users available to associate with the posts.</response>
        [HttpGet("generate/{amount}")]
        public IActionResult Generate(int amount)
        {
            if (amount < 1 || amount > 500)
            {
                return BadRequest(new { message = "The amount must be between 1 and 500." });
            }

            List<Post> generatedPosts = new List<Post>();
            Random random = new Random();
            int totalUsers = _context.Users.Count();

            for (int i = 0; i < amount; i++)
            {
                // Generate a random timespan between 0 and 120 days
                int randomDays = random.Next(0, 121);
                DateTime randomizedCreatedAt = DateTime.Now.AddDays(-randomDays);

                // Generate a new Post
                var p = new Post()
                {
                    User = _context.Users.OrderBy(u => Guid.NewGuid()).FirstOrDefault(),
                    Content = Faker.Lorem.Sentence(),
                    Likes = random.Next(0, totalUsers + 1),
                    CreatedAt = randomizedCreatedAt,
                };

                // Add the post to the context
                _context.Posts.Add(p);
                _context.SaveChanges();
                generatedPosts.Add(p);
            }

            // Return a list of the generated posts with relevant details
            var result = generatedPosts.Select(post => new
            {
                PostID = post.ID,
                UserID = post.User.ID,
                Content = post.Content,
                CreatedAt = post.CreatedAt
            });

            // Return success message and generated post details
            return Ok(new { message = $"{amount} posts generated successfully.", posts = result });
        }
    }
}
