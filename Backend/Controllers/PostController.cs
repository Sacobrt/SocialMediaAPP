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
    public class PostController(SocialMediaContext context, IMapper mapper) : SocialMediaController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<PostDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<PostDTORead>>(_context.Posts.Include(g => g.User)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<PostDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Post? e;
            try
            {
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

        [HttpPost]
        public IActionResult Post(PostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            User? es;
            try
            {
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

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
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
                    es = _context.Users.Find(dto.UserID);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { message = "Post at users cannot be found!" });
                }

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
                Post? e;
                try
                {
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
                _context.Posts.Remove(e);
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
