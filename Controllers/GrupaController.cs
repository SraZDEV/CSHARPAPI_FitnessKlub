using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_FitnessKlub.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]


    public class GrupaController:ControllerBase
    {
        private readonly FitnessKlubContext _context;


        public GrupaController(FitnessKlubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Grupe);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.Grupe.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Grupa grupa)
        {
            _context.Grupe.Add(grupa);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, grupa);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, Grupa grupa)
        {
            var grupaIzBaze = _context.Grupe.Find(id);

            grupaIzBaze.Naziv = grupa.Naziv;
            grupaIzBaze.PrivatniTrener = grupa.PrivatniTrener;
            grupaIzBaze.KolicinaClanova = grupa.KolicinaClanova;
            grupaIzBaze.Cijena = grupa.Cijena;

            _context.Grupe.Update(grupaIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var grupaIzBaze = _context.Grupe.Find(id);
            _context.Grupe.Remove(grupaIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }




    }
}
