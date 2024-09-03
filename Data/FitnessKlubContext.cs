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

    }
}
