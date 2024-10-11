using AutoMapper;
using CSHARPAPI_FitnessKlub.Models;
using CSHARPAPI_FitnessKlub.Models.DTO;

namespace CSHARPAPI_FitnessKlub.Mapping
{
    public class FitnessKlubMappingProfile:Profile
    {
        public FitnessKlubMappingProfile() 
        {
            // izvor -> odredište
            CreateMap<PrivatniTrener, PrivatniTrenerDTORead>();
            CreateMap<PrivatniTrenerDTOInsertUpdate, PrivatniTrener>();


            
            CreateMap<Grupa, GrupaDTORead>()
                .ForCtorParam(
                    "PrivatniTrenerNaziv",
                    opt => opt.MapFrom(src => src.PrivatniTrener.Ime + " " + src.PrivatniTrener.Prezime)
                );
            CreateMap<Grupa, GrupaDTOInsertUpdate>().ForCtorParam(
                    "PrivatniTrenerSifra",
                    opt => opt.MapFrom(src => src.PrivatniTrener.Id)
                );
            CreateMap<GrupaDTOInsertUpdate, Grupa>();
            


            CreateMap<Clan, ClanDTORead>()
                .ForCtorParam(
                    "GrupaNaziv",
                    opt => opt.MapFrom(src => src.Grupa.Naziv)
                );
            CreateMap<Clan, ClanDTOInsertUpdate>().ForCtorParam(
                    "GrupaSifra",
                    opt => opt.MapFrom(src => src.Grupa.Id)
                );
            CreateMap<ClanDTOInsertUpdate, Clan>();
        }


    }
}
