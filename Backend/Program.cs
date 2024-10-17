using CSHARP_SocialMediaAPP.Data;
using CSHARP_SocialMediaAPP.Extensions;
using CSHARP_SocialMediaAPP.Mapping;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSocialMediaSwaggerGen();
builder.Services.AddSocialMediaCORS();

builder.Services.AddDbContext<SocialMediaContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("SocialMediaContext"));
    }
    );

//automapper
builder.Services.AddAutoMapper(typeof(MainMappingProfile));

builder.Services.AddSocialMediaSecurity();
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
        options.EnableTryItOutByDefault();
        //options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
    });
//}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.UseCors("CorsPolicy");

app.Run();
