using System.ComponentModel.DataAnnotations;

namespace SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for inserting or updating a follower relationship.
    /// Represents the relationship between a user and their follower, including the date the follow action occurred.
    /// </summary>
    /// <param name="UserID">The unique identifier of the user being followed. This field is required.</param>
    /// <param name="FollowerUserID">The unique identifier of the user who is following. This field is required.</param>
    /// <param name="FollowedAt">The timestamp indicating when the follow action occurred. This field is required and should be in UTC.</param>
    public record FollowerDTOInsertUpdate(
        [Required(ErrorMessage = "User ID is required!")]
        int UserID,

        [Required(ErrorMessage = "Follower User ID is required!")]
        int FollowerUserID,

        [Required(ErrorMessage = "Date is required!")]
        DateTime FollowedAt);
}
