using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSHARP_SocialMediaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SocialMediaContext _context;
        public UserController(SocialMediaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Users);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.Users.Find(id));
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, user);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, User user)
        {
            var db = _context.Users.Find(id);

            db.Username = user.Username;
            db.Password = user.Password;
            db.Email = user.Email;
            db.FirstName = user.FirstName;
            db.LastName = user.LastName;
            db.CreatedAt = user.CreatedAt;

            _context.Users.Update(db);
            _context.SaveChanges();

            return Ok(new { poruka = "Successfully changed!" });
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var db = _context.Users.Find(id);
            _context.Users.Remove(db);
            _context.SaveChanges();
            return Ok(new { poruka = "Successfully deleted!" });
        }
    }
}
