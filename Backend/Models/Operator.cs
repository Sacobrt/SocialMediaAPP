namespace CSHARP_SocialMediaAPP.Models
{
    public class Operator : Entity
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
