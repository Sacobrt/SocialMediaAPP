using AutoMapper;
using CSHARP_SocialMediaAPP.Data;
using Microsoft.AspNetCore.Mvc;

namespace CSHARP_SocialMediaAPP.Controllers
{
    public abstract class SocialMediaController : ControllerBase
    {
        protected readonly SocialMediaContext _context;
        protected readonly IMapper _mapper;

        public SocialMediaController(SocialMediaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
