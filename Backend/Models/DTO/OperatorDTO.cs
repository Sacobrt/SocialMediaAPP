using System.ComponentModel.DataAnnotations;

namespace SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for handling operator authentication.
    /// Contains the necessary fields for an operator to log in to the system, including their email and password.
    /// </summary>
    /// <param name="Email">The email address of the operator. This field is required for authentication.</param>
    /// <param name="Password">The password of the operator. This field is required for authentication.</param>
    public record OperatorDTO(
        [Required(ErrorMessage = "Email is required.")]
        string? Email,

        [Required(ErrorMessage = "Password is required.")]
        string? Password
    );
}
