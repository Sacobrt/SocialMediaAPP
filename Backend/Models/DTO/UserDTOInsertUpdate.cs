using CSHARP_SocialMediaAPP.Validations;
using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for inserting or updating a user.
    /// Contains the necessary fields for creating or updating user information, including username, password, 
    /// email, and date of birth. Optional fields include the first and last name.
    /// </summary>
    /// <param name="Username">The unique username of the user. This field is required.</param>
    /// <param name="Password">The password of the user. This field is required.</param>
    /// <param name="Email">The email address of the user. This field is required and must be in a valid email format.</param>
    /// <param name="FirstName">The first name of the user. This field is required.</param>
    /// <param name="LastName">The last name of the user. This field is required.</param>
    /// <param name="BirthDate">The date of birth of the user. This field is required and must pass the custom age validation, ensuring the user is at least 10 years old.</param>
    /// <param name="CreatedAt">The timestamp indicating when the user account was created. This field is required.</param>
    public record UserDTOInsertUpdate(
        [Required(ErrorMessage = "Username is required!")]
        string Username,

        [Required(ErrorMessage = "Password is required!")]
        string Password,

        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress(ErrorMessage = "Email is not in good format!")]
        string Email,

        [Required(ErrorMessage = "First name is required!")]
        string FirstName,

        [Required(ErrorMessage = "Last name is required!")]
        string LastName,

        [Required(ErrorMessage = "Date of birth is required!")]
        [AgeValidator(10, ErrorMessage = "You must be at least 10 years old.")]
        DateTime BirthDate,

        [Required(ErrorMessage = "Date is required!")]
        DateTime CreatedAt
    );
}
