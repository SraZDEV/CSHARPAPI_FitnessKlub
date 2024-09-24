using AutoMapper;
using CSHARPAPI_FitnessKlub.Data;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_FitnessKlub.Controllers
{
    public abstract class FitnessKlubController:ControllerBase
    {

        protected readonly FitnessKlubContext _context;

        protected readonly IMapper _mapper;



        public FitnessKlubController(FitnessKlubContext context, IMapper mapper) 
        {

            _context = context;
            _mapper = mapper;
        
        }
    }
}
