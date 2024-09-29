using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record FollowerDTOInsertUpdate(
        [Required(ErrorMessage = "User ID is required!")]
        int UserID,
        [Required(ErrorMessage = "Follower User ID is required!")]
        int FollowerUserID,
        [Required(ErrorMessage = "Date is required!")]
        DateTime FollowedAt);
}
