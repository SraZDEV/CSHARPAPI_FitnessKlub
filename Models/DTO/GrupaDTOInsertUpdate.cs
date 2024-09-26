using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_FitnessKlub.Models.DTO
{
    public record GrupaDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno!")]
        string? Naziv,
        [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "Privatni trener obavezno!")]
        int? PrivatniTrenerNaziv,
        int? KolicinaClanova,
        decimal? Cijena
        );
    
    
}
