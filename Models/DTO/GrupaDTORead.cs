namespace CSHARPAPI_FitnessKlub.Models.DTO
{
    public record GrupaDTORead(
        int Id,
        string? Naziv,
        string? PrivatniTrenerNaziv,
        int? KolicinaClanova,
        decimal? Cijena
        );
    
    
}
