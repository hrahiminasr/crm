using System.Text;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

#region MongoDbSettings
///// get values from this file: appsettings.Development.json /////
// get section
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));


// get values
builder.Services.AddSingleton<IMongoDbSettings>(serviceProvider =>
serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);


// get connectionString to the db
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    MongoDbSettings uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;


    return new MongoClient(uri.ConnectionString);
});

#endregion MongoDbSettings

#region Cors: baraye ta'eede Angular HttpClient requests
builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy => 
            policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
    });
#endregion Cors

#region Authentication & Authorization
string tokenValue = builder.Configuration["TokenKey"]!;

if (!string.IsNullOrEmpty(tokenValue))
{
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue)),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
}
#endregion Authentication & Authorization

#region Dependecy Injection
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<ICustomersRepository, CustomersRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
#endregion Dependecy Injection
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication(); // this line has to be between Cors and Authorization!

app.UseAuthorization();

app.MapControllers();

app.Run();
