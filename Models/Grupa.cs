using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_FitnessKlub.Models;

public class Grupa: Entitet
{

    public string? Naziv { get; set; }
    [Column("privatni_trener")]
    public PrivatniTrener? PrivatniTrener { get; set; }
    [Column ("kolicina_clanova")]
    public int? KolicinaClanova { get; set; }
    public int? Cijena { get; set; }

    

}
