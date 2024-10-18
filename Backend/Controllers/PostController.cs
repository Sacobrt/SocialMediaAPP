using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Controllers
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
                // Retrieve all posts, including associated user information
                return Ok(_mapper.Map<List<PostDTORead>>(_context.Posts.Include(g => g.User)));
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
        /// A PostDTOInsertUpdate object with the post details if found, 
        /// or an error message if the post is not found.
        /// </returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 404)]
        public ActionResult<PostDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Post? e;
            try
            {
                // Retrieve the post by ID, including associated user information
                e = _context.Posts.Include(g => g.User).FirstOrDefault(g => g.ID == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "Post cannot be found!" });
            }
            return Ok(_mapper.Map<PostDTOInsertUpdate>(e));
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
                    .OrderBy(p => p.User.Username)
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
    }
}
