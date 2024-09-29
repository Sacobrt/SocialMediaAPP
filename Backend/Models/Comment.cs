using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARP_SocialMediaAPP.Models
{
    public class Comment : Entity
    {
        [ForeignKey("userID")]
        public required User User { get; set; }

        [ForeignKey("postID")]
        public required Post Post { get; set; }

        [Column("comment")]
        public string Content { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
