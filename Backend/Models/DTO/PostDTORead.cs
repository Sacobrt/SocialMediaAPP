namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record PostDTORead(
        int ID,
        int UserID,
        string Content,
        int? Likes,
        DateTime CreatedAt);
}
