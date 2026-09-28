using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HostelHub.Api.Data;
using HostelHub.Api.Models;
using HostelHub.Api.DTOs;

namespace HostelHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TicketsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TicketsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Tickets
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets([FromQuery] string? hostelName = null)
    {
        var query = _context.Tickets.AsQueryable();
        if (!string.IsNullOrWhiteSpace(hostelName))
        {
            query = query.Where(t => t.HostelName== hostelName);
        }
        return await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }


    // GET: api/Tickets/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Ticket>> GetTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
        {
            return NotFound();
        }

        return ticket;
    }

    // POST: api/Tickets
    [HttpPost]
    public async Task<ActionResult<Ticket>> PostTicket([FromBody] CreateTicketDto dto)
    {
        var ticket = new Ticket
        {
            Title = dto.Title,
            Description = dto.Description,
            HostelName = dto.HostelName,
            Priority = dto.Priority,
            RoomNumber = dto.RoomNumber,
            Category = dto.Category,
            CreatedAt = DateTime.UtcNow,
        };
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
    }

    // PATCH: api/Tickets/5
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateTicketStatusDto dto)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound($"Ticket with ID {id} not found.");
        }
        ticket.Status = dto.Status;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/Tickets/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        { 
            return NotFound();
        }
        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PATCH: api/tickets/5/remarks
    [HttpPatch("{id}/remarks")]
    public async Task<IActionResult> UpdateWardenRemarks(int id, [FromBody] UpdateWardenRemarksDto dto)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound($"Ticket with id {id} not found.");
        }
        ticket.WardenRemarks = dto.Remarks;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}


