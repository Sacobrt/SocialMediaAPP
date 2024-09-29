using CSHARP_SocialMediaAPP.Models;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_SocialMediaAPP.Data
{
    public class SocialMediaContext : DbContext
    {
        public SocialMediaContext(DbContextOptions<SocialMediaContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Follower> Followers { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Follower>().HasOne(f => f.User);
            modelBuilder.Entity<Post>().HasOne(p => p.User);
            modelBuilder.Entity<Comment>().HasOne(c => c.User);
            modelBuilder.Entity<Comment>().HasOne(c => c.Post);
        }
    }
}
