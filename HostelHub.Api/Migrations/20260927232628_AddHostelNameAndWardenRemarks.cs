using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HostelHub.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddHostelNameAndWardenRemarks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HostelName",
                table: "Tickets",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WardenRemarks",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HostelName",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "WardenRemarks",
                table: "Tickets");
        }
    }
}
