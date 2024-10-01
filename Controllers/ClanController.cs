using AutoMapper;
using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using CSHARPAPI_FitnessKlub.Models.DTO;
using Microsoft.AspNetCore.Mvc;

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
                return Ok(_mapper.Map<List<ClanDTORead>>(_context.Clanovi));
            }
            catch (Exception ex) 
            { 
                return BadRequest(new {poruka = ex.Message});
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<ClanDTORead> Get(int id) 
        {

            if (!ModelState.IsValid)
            {

                return BadRequest(new { poruka = ModelState });

            }
            Clan? e;
            try
            {
                e = _context.Clanovi.Find(id);
            }
            catch (Exception ex) 
            {
                return BadRequest(new { poruka = ex.Message});
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Clan ne postoji u bazi"});
            }

            return Ok(_mapper.Map<ClanDTORead>(e));

        }


        [HttpPost]
        public IActionResult Post(ClanDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(new { poruka = ModelState });

            }
            try
            {
                var e = _mapper.Map<Clan>(dto);
                _context.Clanovi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<ClanDTORead>(e));
            }
            catch (Exception ex) 
            {
                return BadRequest(new { poruka = ex.Message});
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

                e = _mapper.Map(dto, e);

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
