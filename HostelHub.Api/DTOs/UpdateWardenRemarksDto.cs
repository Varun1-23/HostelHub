using System.ComponentModel.DataAnnotations;

namespace HostelHub.Api.DTOs
{
    public class UpdateWardenRemarksDto
    {
        [Required]
        [MaxLength(200)]
        public string Remarks { get; set; } = string.Empty;
    }
}
