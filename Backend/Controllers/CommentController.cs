using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Controllers
{
    /// <summary>
    /// API Controller for handling comment-related operations.
    /// Provides endpoints for creating, retrieving, updating, and deleting comments within the social media platform.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CommentController : SocialMediaController
    {
        public CommentController(SocialMediaContext context, IMapper mapper) : base(context, mapper) { }

        /// <summary>
        /// Retrieves all comments along with associated user and post details.
        /// </summary>
        /// <returns>A list of CommentDTORead objects containing comment details.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<CommentDTORead>), 200)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public ActionResult<List<CommentDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Retrieves all comments, including user and post data
                return Ok(_mapper.Map<List<CommentDTORead>>(_context.Comments.Include(g => g.User).Include(g => g.Post)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a specific comment by its ID, including associated user and post details.
        /// </summary>
        /// <param name="id">The unique identifier of the comment to retrieve.</param>
        /// <returns>The CommentDTOInsertUpdate object with the comment details if found.</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public ActionResult<CommentDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Retrieves the comment by ID, including related user and post data
                var comment = _context.Comments.Include(g => g.User).Include(g => g.Post).FirstOrDefault(g => g.ID == id);
                if (comment == null)
                {
                    return NotFound(new { message = "Comment cannot be found!" });
                }
                return Ok(_mapper.Map<CommentDTOInsertUpdate>(comment));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Adds a new comment to the system.
        /// </summary>
        /// <param name="dto">The CommentDTOInsertUpdate object containing the comment's data.</param>
        /// <returns>HTTP 201 Created status with the created comment details if successful.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(CommentDTORead), 201)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public IActionResult Post(CommentDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            try
            {
                // Validates the existence of the associated user
                var user = _context.Users.Find(dto.UserID);
                if (user == null)
                {
                    return NotFound(new { message = "User with the given UserID cannot be found!" });
                }

                // Validates the existence of the associated post
                var post = _context.Posts.Find(dto.PostID);
                if (post == null)
                {
                    return NotFound(new { message = "Post with the given PostID cannot be found!" });
                }

                // Maps the DTO to a Comment entity and saves it to the database
                var comment = _mapper.Map<Comment>(dto);
                comment.User = user;
                comment.Post = post;

                _context.Comments.Add(comment);
                _context.SaveChanges();

                // Returns the created comment
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<CommentDTORead>(comment));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Updates an existing comment by its ID.
        /// </summary>
        /// <param name="id">The unique identifier of the comment to update.</param>
        /// <param name="dto">The CommentDTOInsertUpdate object containing the updated comment data.</param>
        /// <returns>HTTP 200 OK status if the update is successful.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public IActionResult Put(int id, CommentDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                // Retrieves the existing comment and related data
                var comment = _context.Comments.Include(g => g.User).FirstOrDefault(x => x.ID == id);
                if (comment == null)
                {
                    return NotFound(new { message = "Comment cannot be found!" });
                }

                // Validates the existence of the associated post
                var post = _context.Posts.Find(dto.PostID);
                if (post == null)
                {
                    return BadRequest(new { message = "Post with the given PostID cannot be found!" });
                }

                // Validates the existence of the associated user
                var user = _context.Users.Find(dto.UserID);
                if (user == null)
                {
                    return NotFound(new { message = "User with the given UserID cannot be found!" });
                }

                // Maps the updated data to the existing comment and saves the changes
                _mapper.Map(dto, comment);
                comment.User = user;
                comment.Post = post;

                _context.Comments.Update(comment);
                _context.SaveChanges();

                return Ok(new { message = "Successfully changed!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Deletes a comment by its ID.
        /// </summary>
        /// <param name="id">The unique identifier of the comment to delete.</param>
        /// <returns>HTTP 200 OK status if the deletion is successful.</returns>
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
                // Retrieves the comment by ID
                var comment = _context.Comments.Find(id);
                if (comment == null)
                {
                    return NotFound(new { message = "Comment cannot be found!" });
                }

                // Deletes the comment and saves changes
                _context.Comments.Remove(comment);
                _context.SaveChanges();

                return Ok(new { message = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a paginated list of comments with optional filtering based on content, username, or user details.
        /// </summary>
        /// <param name="page">The page number to retrieve.</param>
        /// <param name="condition">Optional condition for filtering (e.g., comment content or user information).</param>
        /// <returns>A paginated list of CommentDTORead objects with HTTP 200 OK status.</returns>
        [HttpGet("pagination/{page}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult Pagination(int page, string condition = "")
        {
            const int perPage = 5; // The number of comments to display per page
            condition = condition.ToLower();
            try
            {
                // Retrieves and filters comments by content or user details, ordered by username
                var comments = _context.Comments
                    .Include(p => p.User)
                    .Include(p => p.Post)
                    .Where(p => EF.Functions.Like(p.Content, "%" + condition + "%")
                        || EF.Functions.Like(p.User.Username.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.User.FirstName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.User.LastName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.Post.Content, "%" + condition + "%"))
                    .OrderByDescending(p => p.CreatedAt)
                    .Skip((page - 1) * perPage)
                    .Take(perPage)
                    .ToList();

                return Ok(_mapper.Map<List<CommentDTORead>>(comments));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Generates a specified number of random comments and associates them with random users and posts from the database.
        /// The comments are assigned randomized content, likes, and timestamps within the past 120 days.
        /// </summary>
        /// <param name="amount">The number of comments to generate. Must be between 1 and 500.</param>
        /// <returns>A list of generated comments with their details or an error message if the amount is out of range.</returns>
        /// <response code="200">Returns the list of generated comments.</response>
        /// <response code="400">If the amount is not within the valid range, or if there are no users or posts available to associate with the comments.</response>
        [HttpGet("generate/{amount}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult GenerateComments(int amount)
        {
            if (amount < 1 || amount > 500)
            {
                return BadRequest(new { message = "The amount must be between 1 and 500." });
            }

            List<Comment> generatedComments = new List<Comment>();
            Random random = new Random();
            int totalUsers = _context.Users.Count();

            for (int i = 0; i < amount; i++)
            {
                // Generate a random timespan between 0 and 120 days
                int randomDays = random.Next(0, 121);
                DateTime randomizedCreatedAt = DateTime.Now.AddDays(-randomDays);

                // Generate a new Comment
                var comment = new Comment()
                {
                    User = _context.Users.OrderBy(u => Guid.NewGuid()).FirstOrDefault(),
                    Post = _context.Posts.OrderBy(p => Guid.NewGuid()).FirstOrDefault(),
                    Content = Faker.Lorem.Sentence(),
                    Likes = random.Next(0, totalUsers + 1),
                    CreatedAt = randomizedCreatedAt
                };

                // Add the comment to the context
                _context.Comments.Add(comment);
                _context.SaveChanges();
                generatedComments.Add(comment);
            }

            // Return a list of the generated comments with relevant details
            var result = generatedComments.Select(comment => new
            {
                CommentID = comment.ID,
                UserID = comment.User.ID,
                PostID = comment.Post.ID,
                Content = comment.Content,
                Likes = comment.Likes,
                CreatedAt = comment.CreatedAt
            });

            // Return success message and generated comment details
            return Ok(new { message = $"{amount} comments generated successfully.", comments = result });
        }
    }
}
