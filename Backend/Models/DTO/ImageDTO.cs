using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record ImageDTO(
        [Required(ErrorMessage = "Base64 image is required!")]
        string Base64
    );
}
