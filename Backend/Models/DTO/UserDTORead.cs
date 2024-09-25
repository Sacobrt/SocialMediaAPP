namespace CSHARP_SocialMediaAPP.Models.DTO
{
    public record UserDTORead(
        int ID,
        string Username,
        string Password,
        string? Email,
        string? FirstName,
        string? LastName,
        DateTime CreatedAt);
}
