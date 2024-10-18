using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for inserting or updating a comment.
    /// Contains required fields for creating or modifying a comment, such as user and post associations, 
    /// comment content, and the date it was created. Optional fields like likes are also included.
    /// </summary>
    /// <param name="UserID">The unique identifier of the user making the comment. This field is required.</param>
    /// <param name="PostID">The unique identifier of the post the comment is related to. This field is required.</param>
    /// <param name="Content">The textual content of the comment. This field is required.</param>
    /// <param name="Likes">The number of likes the comment has received. This field is optional and can be null.</param>
    /// <param name="CreatedAt">The timestamp indicating when the comment was created. This field is required and should be provided in UTC.</param>
    public record CommentDTOInsertUpdate(
        [Required(ErrorMessage = "User ID is required!")]
        int UserID,

        [Required(ErrorMessage = "Post ID is required!")]
        int PostID,

        [Required(ErrorMessage = "Content is required!")]
        string Content,

        int? Likes,

        [Required(ErrorMessage = "Date is required!")]
        DateTime CreatedAt);
}
