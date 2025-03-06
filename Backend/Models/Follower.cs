using System.ComponentModel.DataAnnotations.Schema;

namespace SocialMediaAPP.Models
{
    /// <summary>
    /// Represents a follower relationship between two users in the Social Media application.
    /// Inherits from the base Entity class.
    /// </summary>
    public class Follower : Entity
    {
        /// <summary>
        /// The user who is being followed. 
        /// This is a required relationship, represented by a foreign key to the User entity.
        /// </summary>
        [ForeignKey("userID")]
        public required User User { get; set; }

        /// <summary>
        /// The user who is following. 
        /// This is a required relationship, represented by a foreign key to the User entity.
        /// </summary>
        [ForeignKey("followerUserID")]
        public required User FollowerUser { get; set; }

        /// <summary>
        /// The date and time when the follow relationship was created.
        /// </summary>
        public DateTime FollowedAt { get; set; }
    }
}
