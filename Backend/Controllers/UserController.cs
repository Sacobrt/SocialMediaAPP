﻿using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController(SocialMediaContext context, IMapper mapper) : SocialMediaController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<UserDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<UserDTORead>>(_context.Users));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<UserDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            User? e;
            try
            {
                e = _context.Users.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "User cannot be found!" });
            }
            return Ok(_mapper.Map<UserDTORead>(e));
        }

        [HttpPost]
        public IActionResult Post(UserDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var e = _mapper.Map<User>(dto);
                _context.Users.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<UserDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, UserDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                User? e;
                try
                {
                    e = _context.Users.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { message = "User cannot be found!" });
                }

                e = _mapper.Map(dto, e);

                _context.Users.Update(e);
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
                User? e;
                try
                {
                    e = _context.Users.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { message = "User cannot be found!" });
                }
                _context.Users.Remove(e);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("setImage/{id:int}")]
        public IActionResult SetImage(int id, ImageDTO image)
        {
            if (id <= 0)
            {
                return BadRequest(new { message = "ID need to be higher then zero (0)" });
            }
            if (image.Base64 == null || image.Base64?.Length == 0)
            {
                return BadRequest(new { message = "Image not uploaded!" });
            }
            var u = _context.Users.Find(id);
            if (u == null)
            {
                return BadRequest(new { message = "There is no user with ID " + id + "." });
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "images" + ds + "users");
                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var path = Path.Combine(dir + ds + id + ".png");
                System.IO.File.WriteAllBytes(path, Convert.FromBase64String(image.Base64));
                return Ok(new { message = "Image changed successfully!" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("pagination/{page}")]
        public IActionResult Pagination(int page, string condition = "")
        {
            var perPage = 12;
            condition = condition.ToLower();
            try
            {
                var users = _context.Users
                    .Where(u => EF.Functions.Like(u.Username.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(u.FirstName.ToLower(), "%" + condition + "%")
                        || EF.Functions.Like(u.LastName.ToLower(), "%" + condition + "%"))
                    .Skip((perPage * page) - perPage)
                    .Take(perPage)
                    .OrderBy(u => u.Username)
                    .ToList();
                return Ok(_mapper.Map<List<UserDTORead>>(users));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
