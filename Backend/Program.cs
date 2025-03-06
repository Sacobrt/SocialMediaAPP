using SocialMediaAPP.Data;
using SocialMediaAPP.Extensions;
using SocialMediaAPP.Mapping;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container (Dependency Injection).

builder.Services.AddControllers(); // Adds support for controllers in the application.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer(); // Enables API endpoints discovery.
builder.Services.AddSocialMediaSwaggerGen(); // Configures Swagger/OpenAPI documentation for the API.
builder.Services.AddSocialMediaCORS(); // Configures CORS policy to allow cross-origin requests.

// Configure the database context using SQL Server and connection string.
builder.Services.AddDbContext<SocialMediaContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SocialMediaContext"));
});

// Register AutoMapper service and map using the MainMappingProfile configuration.
builder.Services.AddAutoMapper(typeof(MainMappingProfile));

// Adds JWT-based authentication and authorization.
builder.Services.AddSocialMediaSecurity();
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline (Middleware).

// If development environment is active, enable Swagger UI to explore API documentation.
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    // Configures Swagger UI settings, enabling request snippets and default "Try it out" feature.
    options.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    options.EnableTryItOutByDefault(); // Enables "Try it out" by default.
    options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None); // Collapses Swagger documentation sections by default.
});

// Enforce HTTPS for security.
app.UseHttpsRedirection();

// Add authentication and authorization middleware for secured endpoints.
app.UseAuthentication();
app.UseAuthorization();

// Map the controllers to handle incoming HTTP requests.
app.MapControllers();

// Serve static files (like JavaScript, CSS, etc.) from wwwroot folder.
app.UseStaticFiles();
app.UseDefaultFiles(); // Maps default static files (e.g., index.html) as the fallback.

// Map fallback to index.html to support client-side routing for SPA (Single Page Applications).
app.MapFallbackToFile("index.html");

// Enable CORS policy defined in the configuration (allow any origin, method, and header).
app.UseCors("CorsPolicy");

// Run the application and start processing requests.
app.Run();
