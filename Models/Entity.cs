using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Models
{
    public abstract class Entity
    {
        [Key]
        public int? ID { get; set; }
    }
}
