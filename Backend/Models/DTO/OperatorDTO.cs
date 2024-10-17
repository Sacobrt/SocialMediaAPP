using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record OperatorDTO(
        [Required(ErrorMessage = "Email is required.")]
        string? Email,
        [Required(ErrorMessage = "Password is required.")]
        string? Password
    );
}
