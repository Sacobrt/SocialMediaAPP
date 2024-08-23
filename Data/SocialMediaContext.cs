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
    }
}
