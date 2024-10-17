using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CSHARP_SocialMediaAPP.Controllers
{
    [Authorize]
    public abstract class SocialMediaController(SocialMediaContext context, IMapper mapper) : ControllerBase
    {
        protected readonly SocialMediaContext _context = context;
        protected readonly IMapper _mapper = mapper;
    }
}
