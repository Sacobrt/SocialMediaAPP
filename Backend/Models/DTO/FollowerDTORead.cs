namespace SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for reading a follower relationship.
    /// Represents the structure of a follower relationship as it is returned from the API, 
    /// including details about the users involved and the date the follow action occurred.
    /// </summary>
    /// <param name="ID">The unique identifier of the follower relationship.</param>
    /// <param name="User">The username of the user being followed.</param>
    /// <param name="FollowerUser">The username of the user who is following.</param>
    /// <param name="FollowedAt">The timestamp indicating when the follow action occurred.</param>
    public record FollowerDTORead(
        int ID,
        string User,
        string FollowerUser,
        DateTime FollowedAt);
}
