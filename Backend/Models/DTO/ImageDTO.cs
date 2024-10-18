using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models.DTO
{
    /// <summary>
    /// Data Transfer Object (DTO) for uploading or updating an image.
    /// Represents the structure of an image as a Base64 encoded string, typically used for transferring images
    /// as part of API requests.
    /// </summary>
    /// <param name="Base64">The Base64 encoded string representing the image. This field is required.</param>
    public record ImageDTO(
        [Required(ErrorMessage = "Base64 image is required!")]
        string Base64
    );
}
