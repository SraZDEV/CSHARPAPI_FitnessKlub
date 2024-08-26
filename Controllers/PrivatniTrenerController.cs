using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_FitnessKlub.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]

    
    public class PrivatniTrenerController:ControllerBase
    {

        private readonly FitnessKlubContext _context;


        public PrivatniTrenerController(FitnessKlubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.PrivatniTreneri);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.PrivatniTreneri.Find(id));
        }

        [HttpPost]
        public IActionResult Post(PrivatniTrener privatnitrener)
        {
            _context.PrivatniTreneri.Add(privatnitrener);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, privatnitrener);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, PrivatniTrener privatnitrener)
        {
            var privatnitrenerIzBaze = _context.PrivatniTreneri.Find(id);

            privatnitrenerIzBaze.Ime = privatnitrener.Ime;
            privatnitrenerIzBaze.Prezime = privatnitrener.Prezime;
            privatnitrenerIzBaze.Email = privatnitrener.Email;
            privatnitrenerIzBaze.CijenaSat = privatnitrener.CijenaSat;

            _context.PrivatniTreneri.Update(privatnitrenerIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var smjerIzBaze = _context.PrivatniTreneri.Find(id);
            _context.PrivatniTreneri.Remove(smjerIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }

    }
}
