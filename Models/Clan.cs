using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_FitnessKlub.Models;

public class Clan: Entitet
{

    public required string Ime { get; set; }
    public required string Prezime { get; set; }
    public required string Email { get; set; }
    [ForeignKey("grupa")]
    public required Grupa Grupa { get; set; }
    [Column("clan_od")]
    public DateTime? ClanOd { get; set; }
    public bool Verificiran { get; set; }


    public ICollection<PrivatniTrener>? PrivatniTreneri { get; } = [];
}
