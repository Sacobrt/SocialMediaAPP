using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
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
