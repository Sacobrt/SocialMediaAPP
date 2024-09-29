namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record CommentDTORead(
        int ID,
        int UserID,
        int PostID,
        string Content,
        int? Likes,
        DateTime CreatedAt);
}
