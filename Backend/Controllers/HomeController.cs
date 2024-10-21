using AutoMapper;
using CSHARP_SocialMediaAPP.Controllers;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Controllers
{

    /// <summary>
    /// API Controller responsible for handling home-related operations for the social media application.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class HomeController : SocialMediaController
    {
        public HomeController(SocialMediaContext context, IMapper mapper) : base(context, mapper) { }

        /// <summary>
        /// Retrieves a paginated list of posts, with optional filtering based on a search term.
        /// </summary>
        /// <param name="page">The page number to retrieve, starting from 1. Each page contains a fixed number of posts.</param>
        /// <param name="condition">
        /// An optional search term used to filter posts. The search will match the post content, username, first name, or last name.
        /// If no condition is provided, all posts are retrieved.
        /// </param>
        /// <returns>
        /// A paginated list of posts that match the search condition. If no posts match, an empty list is returned. 
        /// In the case of an error, a `400 Bad Request` is returned with the error message.
        /// </returns>
        /// <response code="200">
        /// Returns a paginated list of posts. Each post includes details such as the content, username, and creation date.
        /// </response>
        /// <response code="400">
        /// Returns a `400 Bad Request` if an error occurs, such as invalid input or server issues.
        /// </response>
        [HttpGet("pagination/{page}")]
        [ProducesResponseType(typeof(string), 400)]
        public IActionResult Pagination(int page, string condition = "")
        {
            var perPage = 30;
            condition = condition.ToLower();
            try
            {
                var posts = _context.Posts
                    .Include(p => p.User)
                    .Include(p => p.Comments)
                    .ThenInclude(c => c.User)
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
    }
}
