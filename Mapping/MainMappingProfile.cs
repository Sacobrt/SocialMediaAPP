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
        }
    }
}
