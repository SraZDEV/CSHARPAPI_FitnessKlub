using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_FitnessKlub.Models
{
    public class PrivatniTrener: Entitet
    {
        public int? Id { get; set; }
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public string? Email { get; set; }

        [Column("cijena_sat")]
        public decimal? CijenaSat { get; set; }

    }
}
