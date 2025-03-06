using System.ComponentModel.DataAnnotations;

namespace SocialMediaAPP.Models
{
    /// <summary>
    /// Abstract base class representing a common entity with an optional ID.
    /// This class serves as a base for other entities in the Social Media application.
    /// </summary>
    public abstract class Entity
    {
        /// <summary>
        /// The unique identifier (ID) for the entity.
        /// It is an optional field, allowing for nullable IDs in cases like newly created objects before they are persisted in the database.
        /// </summary>
        [Key]
        public int ID { get; set; }
    }
}
