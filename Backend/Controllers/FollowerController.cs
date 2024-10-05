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
    public class FollowerController(SocialMediaContext context, IMapper mapper) : SocialMediaController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<FollowerDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<FollowerDTORead>>(_context.Followers.Include(g => g.User).Include(g => g.FollowerUser)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<FollowerDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Follower? e;
            try
            {
                e = _context.Followers.Include(g => g.User).Include(g => g.FollowerUser).FirstOrDefault(g => g.ID == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "Followers cannot be found!" });
            }
            return Ok(_mapper.Map<FollowerDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(FollowerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            User? userId;
            try
            {
                userId = _context.Users.Find(dto.UserID);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            if (userId == null)
            {
                return NotFound(new { message = "Follower User with the given UserID cannot be found!" });
            }

            User? followUserId;
            try
            {
                followUserId = _context.Users.Find(dto.FollowerUserID);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            if (followUserId == null)
            {
                return NotFound(new { message = "User to be followed with the given FollowerUserID cannot be found!" });
            }

            if (userId.ID == followUserId.ID)
            {
                return BadRequest(new { message = "A user cannot follow themselves!" });
            }

            if (_context.Followers.Any(f => f.User.ID == dto.UserID && f.FollowerUser.ID == dto.FollowerUserID))
            {
                return BadRequest(new { message = "The follower relationship already exists!" });
            }

            try
            {
                var e = _mapper.Map<Follower>(dto);

                e.User = userId;
                e.FollowerUser = followUserId;
                e.User = userId;

                _context.Followers.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<FollowerDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, FollowerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            try
            {
                var existingFollower = _context.Followers.Include(g => g.User).Include(g => g.FollowerUser).FirstOrDefault(x => x.ID == id);

                if (existingFollower == null)
                {
                    return NotFound(new { message = "Follower cannot be found!" });
                }

                var userId = _context.Users.Find(dto.UserID);
                if (userId == null)
                {
                    return NotFound(new { message = "User to be followed cannot be found!" });
                }

                var followerUserId = _context.Users.Find(dto.FollowerUserID);
                if (followerUserId == null)
                {
                    return NotFound(new { message = "Follower user cannot be found!" });
                }

                if (userId.ID == followerUserId.ID)
                {
                    return BadRequest(new { message = "A user cannot follow themselves!" });
                }

                if (_context.Followers.Any(f => f.User.ID == dto.UserID && f.FollowerUser.ID == dto.FollowerUserID && f.ID != id))
                {
                    return BadRequest(new { message = "The follower relationship already exists!" });
                }

                existingFollower.User = userId;
                existingFollower.FollowerUser = followerUserId;

                _context.Followers.Update(existingFollower);
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
                Follower? e;
                try
                {
                    e = _context.Followers.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { message = "Followers not found!" });
                }

                _context.Followers.Remove(e);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
