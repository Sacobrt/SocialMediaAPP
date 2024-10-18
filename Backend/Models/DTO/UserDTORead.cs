namespace CSHARP_SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for reading user information.
    /// Represents the structure of user data as it is returned from the API, including details like the username, email,
    /// names, birth date, profile image, and creation timestamp.
    /// </summary>
    /// <param name="ID">The unique identifier of the user.</param>
    /// <param name="Username">The username of the user.</param>
    /// <param name="Password">The password of the user. This field is required for internal use but should not be exposed to clients.</param>
    /// <param name="Email">The email address of the user. This field is optional.</param>
    /// <param name="FirstName">The first name of the user. This field is optional.</param>
    /// <param name="LastName">The last name of the user. This field is optional.</param>
    /// <param name="BirthDate">The date of birth of the user. This field is optional.</param>
    /// <param name="CreatedAt">The timestamp indicating when the user was created.</param>
    /// <param name="Image">The path or URL to the user's profile image. This field is optional.</param>
    public record UserDTORead(
        int ID,
        string Username,
        string Password,
        string? Email,
        string? FirstName,
        string? LastName,
        DateTime? BirthDate,
        DateTime CreatedAt,
        string? Image);
}
