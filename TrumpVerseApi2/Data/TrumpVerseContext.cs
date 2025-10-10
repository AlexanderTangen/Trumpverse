using Microsoft.EntityFrameworkCore;
using TrumpVerseApi2.Models;
namespace TrumpVerseApi2.Data
{
    public class TrumpVerseContext : DbContext
    {
        public TrumpVerseContext(DbContextOptions<TrumpVerseContext> options) : base(options) { }

        public DbSet<TrumpMerch> TrumpMerchandise { get; set; }
    }
}

