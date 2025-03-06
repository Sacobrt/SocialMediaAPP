using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;

namespace SocialMediaAPP.Extensions
{
    /// <summary>
    /// Provides extension methods for configuring Swagger, CORS, and security (JWT authentication) for the Social Media API.
    /// </summary>
    public static class SocialMediaExtensions
    {
        /// <summary>
        /// Adds and configures Swagger/OpenAPI documentation for the Social Media API.
        /// </summary>
        /// <param name="services">The IServiceCollection to add SwaggerGen to.</param>
        public static void AddSocialMediaSwaggerGen(this IServiceCollection services)
        {
            services.AddSwaggerGen(sgo =>
            {
                // Define basic API information
                var apiInfo = new OpenApiInfo()
                {
                    Title = "Social Media API",
                    Version = "v1",
                    Description = "This API provides a set of endpoints to manage interactions within a social media platform, including users, posts, comments, follower relationships, and authentication. The API supports JWT-based authentication and is designed to be easily integrated into both web and mobile applications.",
                    Contact = new OpenApiContact()
                    {
                        Email = "sacerdanijel@gmail.com",
                        Name = "Danijel Sačer",
                        Url = new Uri("https://github.com/sacobrt")
                    },
                    License = new OpenApiLicense()
                    {
                        Name = "Educational License",
                        Url = new Uri("https://opensource.org/licenses/MIT")
                    }
                };
                sgo.SwaggerDoc("v1", apiInfo);

                // Configure JWT authentication for Swagger
                sgo.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT authentication. Obtain a token from /api/v1/Authorization/token. Use 'Bearer [space] your_token' in the Authorization header. Example: 'Bearer your_token'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                // Apply security requirements for JWT authentication
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

                // Include XML comments from the project's generated XML file for detailed API documentation
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

                // Add multiple servers
                var servers = new List<OpenApiServer>
                {
                    new OpenApiServer { Url = "https://localhost:7256", Description = "Development Server" },  // Development URL
                    new OpenApiServer { Url = "https://sacobrt-001-site1.ctempurl.com", Description = "Production Server" } // Remote production URL
                };

                // Add all servers to Swagger
                foreach (var server in servers)
                {
                    sgo.AddServer(server);
                }
            });
        }

        /// <summary>
        /// Adds and configures Cross-Origin Resource Sharing (CORS) policies for the Social Media API.
        /// </summary>
        /// <param name="services">The IServiceCollection to add CORS policies to.</param>
        public static void AddSocialMediaCORS(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                // Define a CORS policy that allows any origin, method, and header
                options.AddPolicy("CorsPolicy",
                    builder =>
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                );
            });
        }

        /// <summary>
        /// Adds and configures JWT authentication for the Social Media API.
        /// </summary>
        /// <param name="services">The IServiceCollection to add JWT security to.</param>
        public static void AddSocialMediaSecurity(this IServiceCollection services)
        {
            services.AddAuthentication(x =>
            {
                // Set the default authentication scheme to JWT Bearer
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                // Configure token validation parameters
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("TNm2s38axo4UIHsUwcvvmTuJRprFrGGodpyItWoDrZwTj21tqVTuJRprFrGGodpyItWoDrZwTj21tqVUwcvvmTuJRprFrGGodpyItWoDrZ")),
                    ValidateIssuer = false, // Issuer validation is disabled
                    ValidateAudience = false, // Audience validation is disabled
                    ValidateLifetime = true,  // Token expiration is validated
                    ValidateIssuerSigningKey = false // Issuer signing key validation is disabled
                };
            });
        }
    }
}
