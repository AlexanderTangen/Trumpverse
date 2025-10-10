using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrumpVerseApi2.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIsAvailableAddStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "TrumpMerchandise");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "TrumpMerchandise",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
