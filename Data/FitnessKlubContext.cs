using CSHARPAPI_FitnessKlub.Models;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_FitnessKlub.Data
{
    public class FitnessKlubContext : DbContext
    {

        public FitnessKlubContext(DbContextOptions<FitnessKlubContext> opcije) : base(opcije)
        {

        }

        public DbSet<PrivatniTrener> Privatni_Treneri { get; set; }
        public DbSet<Clan> Clanovi { get; set; }
        public DbSet<Grupa> Grupe { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Grupa>().HasOne(g => g.PrivatniTrener);
        }  
    }
}
