using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record PostDTOInsertUpdate(
        [Required(ErrorMessage = "User ID is required!")]
        int UserID,
        [Required(ErrorMessage = "Content is required!")]
        string Content,
        int? Likes,
        [Required(ErrorMessage = "Date is required!")]
        DateTime CreatedAt);
}
