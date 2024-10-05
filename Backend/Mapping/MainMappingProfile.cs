using AutoMapper;
using CSHARP_SocialMediaAPP.Models;
using CSHARP_SocialMediaAPP.Models.DTO;

namespace CSHARP_SocialMediaAPP.Mapping
{
    public class MainMappingProfile : Profile
    {
        public MainMappingProfile()
        {
            CreateMap<User, UserDTORead>();
            CreateMap<UserDTOInsertUpdate, User>();

            CreateMap<Follower, FollowerDTORead>()
                .ForCtorParam("User", opt => opt.MapFrom(src => src.User.Username))
                .ForCtorParam("FollowerUser", opt => opt.MapFrom(src => src.FollowerUser.Username));
            CreateMap<Follower, FollowerDTOInsertUpdate>().ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User.ID));
            CreateMap<FollowerDTOInsertUpdate, Follower>();

            CreateMap<Post, PostDTORead>()
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User));
            CreateMap<Post, PostDTOInsertUpdate>()
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User));
            CreateMap<PostDTOInsertUpdate, Post>();

            CreateMap<Comment, CommentDTORead>()
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.PostID, opt => opt.MapFrom(src => src.Post));
            CreateMap<Comment, CommentDTOInsertUpdate>()
                .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.PostID, opt => opt.MapFrom(src => src.Post));
            CreateMap<CommentDTOInsertUpdate, Comment>();
        }
    }
}
