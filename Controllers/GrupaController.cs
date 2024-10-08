using AutoMapper;
using CSHARPAPI_FitnessKlub.Data;
using CSHARPAPI_FitnessKlub.Models;
using CSHARPAPI_FitnessKlub.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CSHARPAPI_FitnessKlub.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class GrupaController(FitnessKlubContext context, IMapper mapper) : FitnessKlubController(context, mapper)
    {


        // RUTE
        [HttpGet]
        public ActionResult<List<GrupaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<GrupaDTORead>>(_context.Grupe.Include(g => g.PrivatniTrener)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<GrupaDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Grupa? e;
            try
            {
                e = _context.Grupe.Include(g => g.PrivatniTrener).FirstOrDefault(g => g.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Grupa ne postoji u bazi" });
            }

            return Ok(_mapper.Map<GrupaDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(GrupaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            PrivatniTrener? es;
            try
            {
                es = _context.Privatni_Treneri.Find(dto.PrivatniTrenerId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Smjer na grupi ne postoji u bazi" });
            }

            try
            {
                var e = _mapper.Map<Grupa>(dto);
                e.PrivatniTrener = es;
                _context.Grupe.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, new GrupaDTORead(e.Id, e.Naziv, e.PrivatniTrener.Ime + " " + e.PrivatniTrener.Prezime, e.KolicinaClanova, e.Cijena));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, GrupaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Grupa? e;
                try
                {
                    e = _context.Grupe.Include(g => g.PrivatniTrener).FirstOrDefault(x => x.Id == id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Grupa ne postoji u bazi" });
                }

                PrivatniTrener? es;
                try
                {
                    es = _context.Privatni_Treneri.Find(dto.PrivatniTrenerId);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = "Smjer na grupi ne postoji u bazi" });
                }

                //e = _mapper.Map(dto, e);
                e.Naziv = dto.Naziv;
                e.KolicinaClanova = dto.KolicinaClanova;
                e.Cijena = dto.Cijena;
                e.PrivatniTrener = es;
                _context.Grupe.Update(e);
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
                Grupa? e;
                try
                {
                    e = _context.Grupe.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Grupa ne postoji u bazi");
                }
                _context.Grupe.Remove(e);
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
