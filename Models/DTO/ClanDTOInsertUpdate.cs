using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_FitnessKlub.Models.DTO
{
    public record ClanDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno!")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno!")]
        string Prezime,
        [Required(ErrorMessage = "Email obavezan!")]
        [EmailAddress(ErrorMessage ="Email nije dobrog formata")]
        string Email,
        int GrupaId,
        DateTime? ClanOd,
        [Required(ErrorMessage = "Obavezna verifikacija!")]
        bool Verificiran

        );
}
