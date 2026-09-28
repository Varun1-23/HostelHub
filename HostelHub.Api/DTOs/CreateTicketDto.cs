using System.ComponentModel.DataAnnotations;

namespace HostelHub.Api.DTOs;

public class CreateTicketDto
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string HostelName { get; set; } = string.Empty;

    [Required]
    public string RoomNumber { get; set; } = string.Empty;
    [Required]
    public string Priority { get; set; } = string.Empty;
    [Required]
    public string Category { get; set; } = string.Empty;
}
