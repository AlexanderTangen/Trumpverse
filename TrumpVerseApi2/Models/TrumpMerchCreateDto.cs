using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace TrumpVerseApi2.Models
{
    public class TrumpMerchCreateDto
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public decimal Price { get; set; }
        
        public string Description { get; set; }

        public IFormFile Image { get; set; }

        [Required]
        public int Stock { get; set; }
    }
}
