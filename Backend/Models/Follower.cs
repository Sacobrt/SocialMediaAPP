using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARP_SocialMediaAPP.Models
{
    public class Follower : Entity
    {
        public required User User { get; set; }
        public int UserID { get; set; }
        public int FollowerUserID { get; set; }
        public DateTime FollowedAt { get; set; }
    }
}
