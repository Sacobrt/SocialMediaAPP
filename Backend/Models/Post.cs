using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARP_SocialMediaAPP.Models
{
    /// <summary>
    /// Represents a post created by a user in the Social Media application.
    /// Inherits from the base Entity class.
    /// </summary>
    public class Post : Entity
    {
        /// <summary>
        /// The user who created the post.
        /// This is a required relationship, represented by a foreign key to the User entity.
        /// </summary>
        [ForeignKey("userID")]
        public required User User { get; set; }

        /// <summary>
        /// The content of the post.
        /// Stored in the "post" column in the database.
        /// </summary>
        [Column("post")]
        public string Content { get; set; }

        public List<Comment> Comments { get; set; } = new List<Comment>();

        /// <summary>
        /// The number of likes that the post has received.
        /// </summary>
        public int Likes { get; set; }

        /// <summary>
        /// The date and time when the post was created.
        /// </summary>
        public DateTime CreatedAt { get; set; }
    }
}
