using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_FitnessKlub.Models
{
    public class PrivatniTrener: Entitet
    {
        public required string Ime { get; set; }
        public required string Prezime { get; set; }
        public required string Email { get; set; }

        [Column("cijena_sat")]
        public decimal CijenaSat { get; set; }


        public ICollection<Clan>? Clanovi { get; } = [];
    }
}
