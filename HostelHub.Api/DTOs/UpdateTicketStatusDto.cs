using System.ComponentModel.DataAnnotations;

namespace HostelHub.Api.DTOs
{
    public class UpdateTicketStatusDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
    }
}
