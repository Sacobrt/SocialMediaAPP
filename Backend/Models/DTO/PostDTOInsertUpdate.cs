using System.ComponentModel.DataAnnotations;

namespace SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for inserting or updating a post.
    /// Contains the necessary fields for creating or updating a post in the social media platform, including the user who made the post, its content, and the creation date.
    /// </summary>
    /// <param name="UserID">The unique identifier of the user who is creating or updating the post. This field is required.</param>
    /// <param name="Content">The content of the post. This field is required.</param>
    /// <param name="Likes">The number of likes the post has received. This field is optional and can be null if no likes are recorded.</param>
    /// <param name="CreatedAt">The timestamp indicating when the post was created. This field is required.</param>
    public record PostDTOInsertUpdate(
        [Required(ErrorMessage = "User ID is required!")]
        int UserID,

        [Required(ErrorMessage = "Content is required!")]
        string Content,

        int? Likes,

        [Required(ErrorMessage = "Date is required!")]
        DateTime CreatedAt);
}
