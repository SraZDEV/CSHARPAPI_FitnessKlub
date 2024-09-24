using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_FitnessKlub.Models.DTO
{


    public record PrivatniTrenerDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string? Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string? Prezime,
        [Required(ErrorMessage = "Email obavezno")]
        [EmailAddress(ErrorMessage = "Email nije dobrog formata")]
        string? Email,
        [Range(0, 100, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        decimal? CijenaSat
        );

}

