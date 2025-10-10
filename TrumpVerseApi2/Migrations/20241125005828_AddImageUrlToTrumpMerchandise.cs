using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrumpVerseApi2.Migrations
{
    /// <inheritdoc />
    public partial class AddImageUrlToTrumpMerchandise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "TrumpMerchandise",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "TrumpMerchandise");
        }
    }
}
