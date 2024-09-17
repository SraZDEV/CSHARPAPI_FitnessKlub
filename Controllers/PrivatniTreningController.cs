using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_FitnessKlub.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]


    public class PrivatniTreningController:ControllerBase
    {

        private readonly FitnessKlubContext _context;


        public PrivatniTreningController(FitnessKlubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Privatni_Trening);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.Privatni_Trening.Find(id));
        }

        [HttpPost]
        public IActionResult Post(PrivatniTrening privatnitrening)
        {
            _context.Privatni_Trening.Add(privatnitrening);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, privatnitrening);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, PrivatniTrening privatnitrening)
        {
            var privatnitreningIzBaze = _context.Privatni_Trening.Find(id);

            privatnitreningIzBaze.PrivatniTrener = privatnitrening.PrivatniTrener;
            privatnitreningIzBaze.Clan = privatnitrening.Clan;

            _context.Privatni_Trening.Update(privatnitreningIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var privatnitreningIzBaze = _context.Privatni_Trening.Find(id);
            _context.Privatni_Trening.Remove(privatnitreningIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }

    }
}
