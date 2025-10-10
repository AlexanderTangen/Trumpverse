using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrumpVerseApi2.Data;
using TrumpVerseApi2.Models;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;

namespace TrumpVerseApi2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrumpMerchController : ControllerBase
    {
        private readonly TrumpVerseContext _context;

        public TrumpMerchController(TrumpVerseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrumpMerch>>> GetTrumpMerch()
        {
            return await _context.TrumpMerchandise.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TrumpMerch>> GetTrumpMerch(int id)
        {
            var trumpMerch = await _context.TrumpMerchandise.FindAsync(id);

            if (trumpMerch == null)
            {
                return NotFound();
            }

            return trumpMerch;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrumpMerch(int id, [FromForm] TrumpMerchCreateDto merchDto)
        {
            if (id != merchDto.Id)
            {
                return BadRequest();
            }

            var existingMerch = await _context.TrumpMerchandise.FindAsync(id);
            if (existingMerch == null)
            {
                return NotFound();
            }

            existingMerch.Name = merchDto.Name;
            existingMerch.Price = merchDto.Price;
            existingMerch.Description = merchDto.Description;
            existingMerch.Stock = merchDto.Stock;

            if (merchDto.Image != null)
            {
                var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(imagesPath))
                {
                    Directory.CreateDirectory(imagesPath);
                }

                var fileName = Path.GetRandomFileName() + Path.GetExtension(merchDto.Image.FileName);
                var imagePath = Path.Combine(imagesPath, fileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await merchDto.Image.CopyToAsync(stream);
                }

                existingMerch.ImageUrl = $"/images/{fileName}";
            }

            _context.Entry(existingMerch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrumpMerchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TrumpMerch>> PostTrumpMerch([FromForm] TrumpMerchCreateDto merchDto)
        {
            var newMerch = new TrumpMerch
            {
                Name = merchDto.Name,
                Price = merchDto.Price,
                Description = merchDto.Description,
                Stock = merchDto.Stock
            };

            if (merchDto.Image != null)
            {
                var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(imagesPath))
                {
                    Directory.CreateDirectory(imagesPath);
                }

                var fileName = Path.GetRandomFileName() + Path.GetExtension(merchDto.Image.FileName);
                var imagePath = Path.Combine(imagesPath, fileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await merchDto.Image.CopyToAsync(stream);
                }

                newMerch.ImageUrl = $"/images/{fileName}";
            }

            _context.TrumpMerchandise.Add(newMerch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrumpMerch", new { id = newMerch.Id }, newMerch);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrumpMerch(int id)
        {
            var trumpMerch = await _context.TrumpMerchandise.FindAsync(id);
            if (trumpMerch == null)
            {
                return NotFound();
            }

            _context.TrumpMerchandise.Remove(trumpMerch);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("update-stock")]
        public async Task<IActionResult> UpdateStock([FromBody] List<StockUpdateDto> stockUpdates)
        {
            foreach (var stockUpdate in stockUpdates)
            {
                var item = await _context.TrumpMerchandise.FindAsync(stockUpdate.Id);
                if (item == null)
                {
                    return NotFound($"Item with ID {stockUpdate.Id} not found.");
                }

                if (item.Stock < stockUpdate.Quantity)
                {
                    return BadRequest($"Not enough stock for item {item.Name}. Available: {item.Stock}, Requested: {stockUpdate.Quantity}");
                }

                item.Stock -= stockUpdate.Quantity;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool TrumpMerchExists(int id)
        {
            return _context.TrumpMerchandise.Any(e => e.Id == id);
        }
    }

    public class StockUpdateDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
    }
}
