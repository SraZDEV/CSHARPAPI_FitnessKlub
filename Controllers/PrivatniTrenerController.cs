using AutoMapper;
using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using CSHARPAPI_FitnessKlub.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CSHARPAPI_FitnessKlub.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]


    public class PrivatniTrenerController(FitnessKlubContext context, IMapper mapper) : FitnessKlubController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<PrivatniTrenerDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<PrivatniTrenerDTORead>>(_context.Privatni_Treneri));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<PrivatniTrenerDTORead> GetById(int id)
        {
            if (!ModelState.IsValid) 
            { 
                return BadRequest(new { poruka = ModelState }); 
            }
            PrivatniTrener? e;
            try
            {
                e = _context.Privatni_Treneri.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Privatni trener ne postoji u bazi" });
            }

            return Ok(_mapper.Map<PrivatniTrenerDTORead>(e));
        }

        [HttpPost]
        public IActionResult Post(PrivatniTrenerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState});
            }
            try
            {
                var e = _mapper.Map<PrivatniTrener>(dto);
                _context.Privatni_Treneri.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<PrivatniTrenerDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, PrivatniTrenerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState});
            }
            try
            {
                PrivatniTrener? e;
                try
                {
                    e = _context.Privatni_Treneri.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Smjer ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Privatni_Treneri.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
                
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                PrivatniTrener? e;
                try
                {
                    e = _context.Privatni_Treneri.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Privatni trener ne postoji u bazi!");
                }
                _context.Privatni_Treneri.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        // rute: clanovi, dodajClana i obrisiClana

        [HttpGet]
        [Route("Clanovi/{sifraPrivatniTrener:int}")]
        public ActionResult<List<ClanDTORead>> GetClanovi(int sifraPrivatniTrener)
        {
            if (!ModelState.IsValid || sifraPrivatniTrener <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var c = _context.Privatni_Treneri
                    .Include(i => i.Clanovi).FirstOrDefault(x => x.Id == sifraPrivatniTrener);
                    
                if (c == null)
                {
                    return BadRequest("Ne postoji privatni trener sa šifrom " +
                        sifraPrivatniTrener + " u bazi!");
                }

                return Ok(_mapper.Map<List<ClanDTORead>>(c.Clanovi));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPost]
        [Route("{id:int}/dodaj/{clanId:int}")]
        public IActionResult DodajClana(int id, int clanId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id <= 0 || clanId <= 0)
            {
                return BadRequest("Šifra člana ili privatnog trenera nije dobra");
            }
            try
            {
                var c = _context.Clanovi
                    .FirstOrDefault(g => g.Id == id);
                if (c == null)
                {
                    return BadRequest("Ne postoji član sa šifrom ");
                }
                //otići po privatnog trenera
                var p = _context.Privatni_Treneri
                    .Include(i => i.Clanovi).FirstOrDefault(x => x.Id == id);
                p.Clanovi.Add(c);
                _context.Privatni_Treneri.Update(p);
                _context.SaveChanges();
                return Ok(new { poruka = "Član " + clanId + " dodan privatnom treneru"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id:int}/obrisi/{clanId:int}")]
        public IActionResult ObrisiClana(int id, int clanId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id <= 0 || clanId <= 0) 
            {
                return BadRequest("Šifra člana ili privatnog trenera nije dobra");
            }
            try
            {
                var c = _context.Clanovi
                    .FirstOrDefault(g => g.Id == id);
                if (c == null)
                {
                    return BadRequest("Ne postoji član sa šifrom ");
                }
                //otići po privatnog trenera
                var p = _context.Privatni_Treneri
                    .Include(i => i.Clanovi).FirstOrDefault(x => x.Id == id);
                p.Clanovi.Add(c);
                _context.Privatni_Treneri.Update(p);
                _context.SaveChanges();
                return Ok(new { poruka = "Član " + clanId + " obrisan" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }



    }
}
