using AutoMapper;
using SocialMediaAPP.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SocialMediaAPP.Controllers
{
    /// <summary>
    /// Abstract base controller for all controllers in the SocialMediaApp.
    /// Provides shared functionality and services such as database context and object mapping.
    /// Requires authorization for all derived controllers.
    /// </summary>
    [Authorize]
    public abstract class SocialMediaController(SocialMediaContext context, IMapper mapper) : ControllerBase
    {
        /// <summary>
        /// Database context for accessing social media data.
        /// </summary>
        protected readonly SocialMediaContext _context = context;

        /// <summary>
        /// Mapper service for converting between models and DTOs.
        /// </summary>
        protected readonly IMapper _mapper = mapper;
    }
}
