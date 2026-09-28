using System.ComponentModel.DataAnnotations;
namespace HostelHub.Api.Models;
public class Ticket
{
    public int Id { get; set; }
    [Required]
    [MaxLength(100)]

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string HostelName { get; set; } = string.Empty;
    public string Category { get; set; } = "General";
    public string Priority { get; set; } = "Medium";
    public string Status { get; set; } = "Pending";
    public string RoomNumber { get; set; } = string.Empty;

    public string? WardenRemarks { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}
