using AutoMapper;
using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using CSHARPAPI_FitnessKlub.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_FitnessKlub.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ClanController(FitnessKlubContext context, IMapper mapper) : FitnessKlubController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<ClanDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(new { poruka = ModelState });

            }
            try
            {
                return Ok(_mapper.Map<List<ClanDTORead>>(_context.Clanovi.Include(g=> g.Grupa)));
            }
            catch (Exception ex) 
            { 
                return BadRequest(new {poruka = ex.Message});
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<ClanDTOInsertUpdate> Get(int id) 
        {

            if (!ModelState.IsValid)
            {

                return BadRequest(new { poruka = ModelState });

            }
            Clan? e;
            try
            {
                e = _context.Clanovi.Include(c=>c.Grupa).FirstOrDefault(x=>x.Id==id);
            }
            catch (Exception ex) 
            {
                return BadRequest(new { poruka = ex.Message});
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Clan ne postoji u bazi"});
            }

            return Ok(_mapper.Map<ClanDTOInsertUpdate>(e));

        }


        [HttpPost]
        public IActionResult Post(ClanDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(new { poruka = ModelState });

            }
            
            
            var grupa = _context.Grupe.Find(dto.GrupaSifra);

            // provjera postoji li grupa

            Grupa? es;
            try
            {
                es = _context.Grupe.Find(dto.GrupaSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new {poruka = "Grupa na koju pokušavate dodati člana ne postoji"});
            }

            try
            {
                var e = _mapper.Map<Clan>(dto);
                e.Grupa = es;
                _context.Clanovi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<ClanDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            
            
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, ClanDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(new { poruka = ModelState });

            }
            try
            {
                Clan? e;
                try
                {
                    e = _context.Clanovi.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Clan ne postoji u bazi" });
                }
                Grupa? es;
                try
                {
                    es = _context.Grupe.FirstOrDefault(x => x.Id == dto.GrupaSifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = "Grupa ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Grupa = es;
                _context.Clanovi.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno," });
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
                Clan? e;
                try
                {
                    e = _context.Clanovi.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Clan ne postoji u bazi");
                }
                _context.Clanovi.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex) 
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }








    }
}
