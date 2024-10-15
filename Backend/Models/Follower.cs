using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARP_SocialMediaAPP.Models
{
    public class Follower : Entity
    {
        [ForeignKey("userID")]
        public required User User { get; set; }

        [ForeignKey("followerUserID")]
        public required User FollowerUser { get; set; }
        public DateTime FollowedAt { get; set; }
    }
}
