namespace CSHARP_SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for reading a comment.
    /// Represents the structure of a comment as it is returned from the API.
    /// Includes details such as the comment ID, the user who made the comment, the post it's associated with, 
    /// the content of the comment, the number of likes, and the date it was created.
    /// </summary>
    /// <param name="ID">The unique identifier of the comment.</param>
    /// <param name="UserID">The unique identifier of the user who made the comment.</param>
    /// <param name="PostID">The unique identifier of the post the comment is associated with.</param>
    /// <param name="Content">The textual content of the comment.</param>
    /// <param name="Likes">The number of likes the comment has received. Can be null if the comment has no likes yet.</param>
    /// <param name="CreatedAt">The timestamp indicating when the comment was created. Stored as UTC.</param>
    public record CommentDTORead(
        int ID,
        int UserID,
        int PostID,
        string Content,
        int? Likes,
        DateTime CreatedAt,
        UserDTORead User);
}
