namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record FollowerDTORead(
        int ID,
        int UserID,
        int FollowerUserID,
        DateTime FollowedAt);
}
