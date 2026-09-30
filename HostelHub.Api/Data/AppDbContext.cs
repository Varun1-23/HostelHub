using Microsoft.EntityFrameworkCore;
using HostelHub.Api.Models;
namespace HostelHub.Api.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<User>Users { get; set; }
}
