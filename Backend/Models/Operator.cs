namespace CSHARP_SocialMediaAPP.Models
{
    /// <summary>
    /// Represents an operator in the Social Media application, responsible for administrative or system-level tasks.
    /// Inherits from the base Entity class.
    /// </summary>
    public class Operator : Entity
    {
        /// <summary>
        /// The email address of the operator.
        /// This is optional and may be used for authentication or contact purposes.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// The password for the operator, used for authentication.
        /// This is optional and can be null if authentication is handled differently.
        /// </summary>
        public string? Password { get; set; }

        /// <summary>
        /// The ID of the associated user, linked to the User entity.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// The associated User entity, representing the operator's corresponding user information.
        /// This is optional and may be null.
        /// </summary>
        public User? User { get; set; }
    }
}
