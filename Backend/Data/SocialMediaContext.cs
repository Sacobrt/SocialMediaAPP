using CSHARP_SocialMediaAPP.Models;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Data
{
    /// <summary>
    /// Database context for the SocialMediaApp, responsible for managing entities and database interactions.
    /// Inherits from the DbContext class.
    /// </summary>
    public class SocialMediaContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the SocialMediaContext class.
        /// </summary>
        /// <param name="options">The options to configure the database context.</param>
        public SocialMediaContext(DbContextOptions<SocialMediaContext> options) : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the Users table.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Gets or sets the Followers table, representing the relationship between users and their followers.
        /// </summary>
        public DbSet<Follower> Followers { get; set; }

        /// <summary>
        /// Gets or sets the Posts table.
        /// </summary>
        public DbSet<Post> Posts { get; set; }

        /// <summary>
        /// Gets or sets the Comments table, representing comments on posts.
        /// </summary>
        public DbSet<Comment> Comments { get; set; }

        /// <summary>
        /// Gets or sets the Operators table, representing system operators.
        /// </summary>
        public DbSet<Operator> Operators { get; set; }

        /// <summary>
        /// Configures the entity relationships and constraints in the database using the model builder.
        /// </summary>
        /// <param name="modelBuilder">The model builder used to configure entities.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configures a one-to-one or one-to-many relationship between Follower and User
            modelBuilder.Entity<Follower>().HasOne(f => f.User);

            // Configures a one-to-one or one-to-many relationship between Follower and FollowerUser
            modelBuilder.Entity<Follower>().HasOne(f => f.FollowerUser);

            // Configures a one-to-one or one-to-many relationship between Post and User
            modelBuilder.Entity<Post>().HasOne(p => p.User);

            // A Post can have many Comments, and each Comment is associated with one Post.
            modelBuilder.Entity<Post>().HasMany(p => p.Comments).WithOne(c => c.Post);

            // Configures a one-to-one or one-to-many relationship between Comment and User
            modelBuilder.Entity<Comment>().HasOne(c => c.User);

            // Configures a one-to-one or one-to-many relationship between Comment and Post
            modelBuilder.Entity<Comment>().HasOne(c => c.Post);

            // Configures a one-to-one relationship between Operator and User
            modelBuilder.Entity<Operator>().HasOne(o => o.User);
        }
    }
}
