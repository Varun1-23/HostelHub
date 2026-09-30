using System.ComponentModel.DataAnnotations;

namespace HostelHub.Api.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(6, ErrorMessage = "Password must be atleast 6 characters long")]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = "Student";

    [Required]
    public string HostelName { get; set; } = string.Empty;

    [Required]
    public string RoomNumber { get; set; } = string.Empty;
}
