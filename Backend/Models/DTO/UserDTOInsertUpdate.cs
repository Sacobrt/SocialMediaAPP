using CSHARP_SocialMediaAPP.Validations;
using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record UserDTOInsertUpdate(
        [Required(ErrorMessage = "Username is required!")]
        string Username,
        [Required(ErrorMessage = "Password is required!")]
        string Password,
        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress(ErrorMessage = "Email is not in good format!")]
        string? Email,
        string? FirstName,
        string? LastName,
        [Required(ErrorMessage = "Date of birth is required!")]
        [AgeValidator(10, ErrorMessage = "You must be at least 10 years old.")]
        DateTime BirthDate,
        [Required(ErrorMessage = "Date is required!")]
        DateTime CreatedAt
    );
}
