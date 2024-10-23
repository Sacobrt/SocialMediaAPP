using AutoMapper;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;

namespace CSHARP_SocialMediaAPP.Mapping
{
    /// <summary>
    /// Defines the AutoMapper profile for mapping between domain models and DTOs used in the application.
    /// </summary>
    public class MainMappingProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of the MainMappingProfile class.
        /// Sets up mappings between entities and their corresponding DTOs.
        /// </summary>
        public MainMappingProfile()
        {
            // User to UserDTORead mapping, constructs the DTO using a custom constructor and maps properties
            CreateMap<User, UserDTORead>()
                .ConstructUsing(e => new UserDTORead(
                    e.ID,
                    e.Username,
                    e.Email,
                    e.FirstName,
                    e.LastName,
                    e.BirthDate,
                    e.CreatedAt,
                    FilePath(e)));

            // UserDTOInsertUpdate to User mapping
            CreateMap<UserDTOInsertUpdate, User>();

            // Follower to FollowerDTORead mapping, maps the User and FollowerUser as usernames
            CreateMap<Follower, FollowerDTORead>()
                .ForCtorParam("User", opt => opt.MapFrom(src => src.User.Username))
                .ForCtorParam("FollowerUser", opt => opt.MapFrom(src => src.FollowerUser.Username));

            // Follower to FollowerDTOInsertUpdate mapping, maps the UserID property
            CreateMap<Follower, FollowerDTOInsertUpdate>()
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User.ID))
                .ForMember(dest => dest.FollowerUserID, opt => opt.MapFrom(src => src.FollowerUser.ID));

            // FollowerDTOInsertUpdate to Follower mapping
            CreateMap<FollowerDTOInsertUpdate, Follower>();

            // Post to PostDTORead mapping, maps the UserID property
            CreateMap<Post, PostDTORead>()
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments))
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User));

            CreateMap<Post, PostDTORead>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments));

            // Post to PostDTOInsertUpdate mapping, maps the UserID property
            CreateMap<Post, PostDTOInsertUpdate>()
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User));

            // PostDTOInsertUpdate to Post mapping
            CreateMap<PostDTOInsertUpdate, Post>();

            // Comment to CommentDTORead mapping, maps the UserID and PostID properties
            CreateMap<Comment, CommentDTORead>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.PostID, opt => opt.MapFrom(src => src.Post));

            // Comment to CommentDTOInsertUpdate mapping, maps the UserID and PostID properties
            CreateMap<Comment, CommentDTOInsertUpdate>()
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.PostID, opt => opt.MapFrom(src => src.Post));

            // CommentDTOInsertUpdate to Comment mapping
            CreateMap<CommentDTOInsertUpdate, Comment>();

            // Operator to OperatorDTO mapping, maps the Email property
            CreateMap<Operator, OperatorDTO>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.User));
        }

        /// <summary>
        /// Returns the file path of the user's profile image if it exists.
        /// </summary>
        /// <param name="e">The User object.</param>
        /// <returns>The file path of the user's image, or null if the image does not exist.</returns>
        private static string FilePath(User e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string image = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "images" + ds + "users" + ds + e.ID + ".png");
                return File.Exists(image) ? "/images/users/" + e.ID + ".png" : null;
            }
            catch
            {
                return null;
            }
        }
    }
}
