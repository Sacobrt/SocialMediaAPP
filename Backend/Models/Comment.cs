using System.ComponentModel.DataAnnotations.Schema;

namespace SocialMediaAPP.Models
{
    /// <summary>
    /// Represents a comment made by a user on a post in the Social Media application.
    /// Inherits from the base Entity class.
    /// </summary>
    public class Comment : Entity
    {
        /// <summary>
        /// The user who created the comment. 
        /// This is a required relationship, represented by a foreign key to the User entity.
        /// </summary>
        [ForeignKey("userID")]
        public required User User { get; set; }

        /// <summary>
        /// The post to which the comment is related. 
        /// This is a required relationship, represented by a foreign key to the Post entity.
        /// </summary>
        [ForeignKey("postID")]
        public required Post Post { get; set; }

        /// <summary>
        /// The actual content of the comment.
        /// Stored in the "comment" column in the database.
        /// </summary>
        [Column("comment")]
        public string Content { get; set; }

        /// <summary>
        /// The number of likes that the comment has received.
        /// </summary>
        public int Likes { get; set; }

        /// <summary>
        /// The date and time when the comment was created.
        /// </summary>
        public DateTime CreatedAt { get; set; }
    }
}
