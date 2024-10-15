using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CommentController(SocialMediaContext context, IMapper mapper) : SocialMediaController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<CommentDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<CommentDTORead>>(_context.Comments.Include(g => g.User).Include(g => g.Post)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<CommentDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Comment? e;
            try
            {
                e = _context.Comments.Include(g => g.User).Include(g => g.Post).FirstOrDefault(g => g.ID == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "Comment cannot be found!" });
            }
            return Ok(_mapper.Map<CommentDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(CommentDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            User? user;
            try
            {
                user = _context.Users.Find(dto.UserID);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (user == null)
            {
                return NotFound(new { message = "User with the given UserID cannot be found!" });
            }

            Post? post;
            try
            {
                post = _context.Posts.Find(dto.PostID);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (post == null)
            {
                return NotFound(new { message = "Post with the given PostID cannot be found!" });
            }

            try
            {
                var comment = _mapper.Map<Comment>(dto);
                comment.User = user;
                comment.Post = post;

                _context.Comments.Add(comment);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, _mapper.Map<CommentDTORead>(comment));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, CommentDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Comment? e;
                try
                {
                    e = _context.Comments.Include(g => g.User).FirstOrDefault(x => x.ID == id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { message = "Comment cannot be found!" });
                }

                Post? post;
                try
                {
                    post = _context.Posts.Find(dto.PostID);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (post == null)
                {
                    return BadRequest(new { message = "Comment at posts cannot be found!" });
                }

                User? user;
                try
                {
                    user = _context.Users.Find(dto.UserID);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (user == null)
                {
                    return NotFound(new { message = "Comment at users cannot be found!" });
                }

                e = _mapper.Map(dto, e);
                e.User = user;
                e.Post = post;
                _context.Comments.Update(e);
                _context.SaveChanges();

                return Ok(new { message = "Successfully changed!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Comment? e;
                try
                {
                    e = _context.Comments.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { message = "Comment cannot be found!" });
                }
                _context.Comments.Remove(e);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("pagination/{page}")]
        public IActionResult Pagination(int page, string condition = "")
        {
            var perPage = 5;
            condition = condition.ToLower();
            try
            {
                var comments = _context.Comments
                    .Include(p => p.User)
                    .Include(p => p.Post)
                    .Where(p => EF.Functions.Like(p.Content, "%" + condition + "%")
                        || EF.Functions.Like(p.User.Username.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.User.FirstName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.User.LastName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(p.Post.Content, "%" + condition + "%"))
                    .OrderBy(p => p.User.Username)
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
    }
}
