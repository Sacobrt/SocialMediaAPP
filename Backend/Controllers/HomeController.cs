﻿using AutoMapper;
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

        /// <summary>
        /// Retrieves total counts of users, posts, and comments.
        /// </summary>
        /// <response code="200">Returns the total counts of users, posts, and comments.</response>
        /// <response code="400">If an error occurs while fetching data.</response>
        [HttpGet("TotalData")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult TotalData()
        {
            try
            {
                var totalUsers = _context.Users.Count();
                var totalPosts = _context.Posts.Count();
                var totalComments = _context.Comments.Count();

                return Ok(new { users = totalUsers, posts = totalPosts, comments = totalComments });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a random list of up to 50 users.
        /// </summary>
        /// <remarks>
        /// This endpoint returns a random set of users shuffled and limited to 50 users.
        /// </remarks>
        /// <response code="200">Returns a list of up to 50 random users.</response>
        /// <response code="404">If no users are found.</response>
        /// <response code="400">If an error occurs while fetching data.</response>
        [HttpGet]
        [Route("RandomUsers")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<UserDTORead>> RandomUsers()
        {
            try
            {
                var users = _mapper.Map<List<UserDTORead>>(_context.Users.ToList());

                if (!users.Any())
                {
                    return NotFound(new { message = "No users found." });
                }

                var random = new Random();
                var shuffledUsers = users.OrderBy(u => random.Next()).ToList();
                var randomUsers = shuffledUsers.Take(50).ToList();

                return Ok(new { message = randomUsers });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
