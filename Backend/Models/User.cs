namespace CSHARP_SocialMediaAPP.Models
{
    /// <summary>
    /// Represents a user in the Social Media application.
    /// Inherits from the base Entity class, providing a unique identifier for each user.
    /// </summary>
    public class User : Entity
    {
        /// <summary>
        /// The username of the user, which can be used for login or display purposes.
        /// This field is optional.
        /// </summary>
        public string? Username { get; set; }

        /// <summary>
        /// The password of the user, used for authentication.
        /// This field is optional and should be securely stored.
        /// </summary>
        public string? Password { get; set; }

        /// <summary>
        /// The email address of the user.
        /// This field is optional and may be used for communication and login purposes.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// The first name of the user.
        /// This field is optional.
        /// </summary>
        public string? FirstName { get; set; }

        /// <summary>
        /// The last name of the user.
        /// This field is optional.
        /// </summary>
        public string? LastName { get; set; }

        /// <summary>
        /// The birthdate of the user.
        /// This field is optional and may be used for age-related features.
        /// </summary>
        public DateTime? BirthDate { get; set; }

        /// <summary>
        /// The date and time when the user account was created.
        /// This field is optional.
        /// </summary>
        public DateTime CreatedAt { get; set; }
    }
}
