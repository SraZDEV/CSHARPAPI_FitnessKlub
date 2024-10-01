using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_FitnessKlub.Models;

public class Clan: Entitet
{

    public string? Ime { get; set; }
    public string? Prezime { get; set; }
    public string? Email { get; set; }
    public Grupa? Grupa { get; set; }
    [Column("clan_od")]
    public DateTime? ClanOd { get; set; }
    public bool? Verificiran { get; set; }


    public ICollection<PrivatniTrener>? PrivatniTreneri { get; } = [];
}
