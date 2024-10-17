using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;

namespace CSHARP_SocialMediaAPP.Extensions
{
    public static class SocialMediaExtensions
    {
        public static void AddSocialMediaSwaggerGen(this IServiceCollection services)
        {
            services.AddSwaggerGen(sgo =>
            {
                var apiInfo = new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    Title = "Social Media API",
                    Version = "v1",
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact()
                    {
                        Email = "sacerdanijel@gmail.com",
                        Name = "Danijel Sačer"
                    },
                    Description = "API documentation for the Social Media platform, providing endpoints to manage user interactions, posts, and authentication.",
                    License = new Microsoft.OpenApi.Models.OpenApiLicense()
                    {
                        Name = "Educational License"
                    }
                };
                sgo.SwaggerDoc("v1", apiInfo);

                sgo.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT authentication. Obtain a token from /api/v1/Authorization/token. Use 'Bearer [space] your_token' in the Authorization header. Example: 'Bearer your_token'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                sgo.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);
            });
        }

        public static void AddSocialMediaCORS(this IServiceCollection Services)
        {
            Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                );
            });
        }

        public static void AddSocialMediaSecurity(this IServiceCollection Services)
        {
            Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("TNm2s38axo4UIHsUwcvvmTuJRprFrGGodpyItWoDrZwTj21tqVTuJRprFrGGodpyItWoDrZwTj21tqVUwcvvmTuJRprFrGGodpyItWoDrZ")),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = false
                };
            });
        }
    }
}
