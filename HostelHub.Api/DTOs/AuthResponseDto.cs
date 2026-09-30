using System.ComponentModel.DataAnnotations;

namespace HostelHub.Api.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string HostelName { get; set; } = string.Empty;
        public string RoomNumber { get; set; } = string.Empty;
    }
}
