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


        }


    }
}
