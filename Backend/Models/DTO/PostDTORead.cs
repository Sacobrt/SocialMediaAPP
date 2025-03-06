namespace SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for reading a post.
    /// Represents the structure of a post as it is returned from the API, including details such as the post ID, 
    /// the user who created it, its content, the number of likes, and the date it was created.
    /// </summary>
    /// <param name="ID">The unique identifier of the post.</param>
    /// <param name="UserID">The unique identifier of the user who created the post.</param>
    /// <param name="Content">The content of the post.</param>
    /// <param name="Likes">The number of likes the post has received. This field is optional and can be null if no likes are recorded.</param>
    /// <param name="CreatedAt">The timestamp indicating when the post was created.</param>
    public record PostDTORead(
        int ID,
        int UserID,
        string Content,
        int? Likes,
        DateTime CreatedAt,
        List<CommentDTORead> Comments,
        UserDTORead User);
}
