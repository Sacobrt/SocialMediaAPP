using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARP_SocialMediaAPP.Models
{
    public class Post : Entity
    {
        [ForeignKey("userID")]
        public required User User { get; set; }

        [Column("post")]
        public string Content { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
