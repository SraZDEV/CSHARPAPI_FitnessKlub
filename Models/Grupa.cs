using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_FitnessKlub.Models;

public class Grupa: Entitet
{

    public required string Naziv { get; set; }
    [ForeignKey("privatni_trener")]
    public required PrivatniTrener PrivatniTrener { get; set; }
    [Column ("kolicina_clanova")]
    public int KolicinaClanova { get; set; }
    public int Cijena { get; set; }

    

}
