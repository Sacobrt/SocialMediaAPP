namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record FollowerDTORead(
        int ID,
        string User,
        string FollowerUser,
        DateTime FollowedAt);
}
