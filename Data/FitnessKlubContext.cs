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
            modelBuilder.Entity<Clan>().HasOne(g => g.Grupa);
            

            // veza više na više = n:n
            modelBuilder.Entity<PrivatniTrener>()
               .HasMany(g => g.Clanovi)
               .WithMany(p => p.PrivatniTreneri)
               .UsingEntity<Dictionary<string, object>>("privatni_trening",
               c => c.HasOne<Clan>().WithMany().HasForeignKey("clan"),
               c => c.HasOne<PrivatniTrener>().WithMany().HasForeignKey("privatni_trener"),
               c => c.ToTable("privatni_trening")
               );

        }


    }
}
