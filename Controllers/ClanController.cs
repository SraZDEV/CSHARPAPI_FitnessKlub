using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_FitnessKlub.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ClanController:ControllerBase
    {

        private readonly FitnessKlubContext _context;


        public ClanController(FitnessKlubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Clanovi);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.Clanovi.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Clan clan)
        {
            _context.Clanovi.Add(clan);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, clan);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, Clan clan)
        {
            var clanIzBaze = _context.Clanovi.Find(id);

            clanIzBaze.Ime = clan.Ime;
            clanIzBaze.Prezime = clan.Prezime;
            clanIzBaze.Email = clan.Email;
            clanIzBaze.Grupa = clan.Grupa;
            clanIzBaze.ClanOd = clan.ClanOd;
            clanIzBaze.Verificiran = clan.Verificiran;

            _context.Clanovi.Update(clanIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var clanIzBaze = _context.Clanovi.Find(id);
            _context.Clanovi.Remove(clanIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }

    }
}
