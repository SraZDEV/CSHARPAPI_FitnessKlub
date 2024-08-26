using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_FitnessKlub.Models
{
    public abstract class Entitet
    {

        [Key]
        public int Sifra { get; set; }

    }
}
