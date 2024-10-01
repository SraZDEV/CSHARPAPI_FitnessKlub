using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_FitnessKlub.Models.DTO
{
    public record ClanDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno!")]
        string? Ime,
        [Required(ErrorMessage = "Prezime obavezno!")]
        string? Prezime,
        [Required(ErrorMessage = "Emali obavezan!")]
        [EmailAddress(ErrorMessage ="Email nije dobrog formata")]
        string? Email,
        int? GrupaNaziv,
        DateTime? clanOd,
        [Required(ErrorMessage = "Obavezna verifikacija!")]
        bool? verificiran

        );
}
