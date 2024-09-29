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
                return Ok(_mapper.Map<List<FollowerDTORead>>(_context.Followers.Include(g => g.User)));
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
                e = _context.Followers.Include(g => g.User).FirstOrDefault(g => g.ID == id);
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

            if (_context.Followers.Any(f => f.UserID == userId.ID && f.FollowerUserID == followUserId.ID))
            {
                return BadRequest(new { message = "The follower relationship already exists!" });
            }

            try
            {
                var e = _mapper.Map<Follower>(dto);

                e.UserID = (int)userId.ID;
                e.FollowerUserID = (int)followUserId.ID;

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
                var existingFollower = _context.Followers.Include(g => g.User).FirstOrDefault(x => x.ID == id);

                if (existingFollower == null)
                {
                    return NotFound(new { message = "Followers cannot be found!" });
                }

                var userBeingFollowed = _context.Users.Find(dto.UserID);
                if (userBeingFollowed == null)
                {
                    return NotFound(new { message = "User to be followed cannot be found!" });
                }

                var newFollowerUser = _context.Users.Find(dto.FollowerUserID);
                if (newFollowerUser == null)
                {
                    return NotFound(new { message = "Follower at users cannot be found!" });
                }

                if (userBeingFollowed.ID == newFollowerUser.ID)
                {
                    return BadRequest(new { message = "A user cannot follow themselves!" });
                }

                if (_context.Followers.Any(f => f.UserID == dto.UserID && f.FollowerUserID == dto.FollowerUserID && f.ID != id))
                {
                    return BadRequest(new { message = "The follower relationship already exists!" });
                }

                existingFollower = _mapper.Map(dto, existingFollower);
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
