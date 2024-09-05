using CSHARPAPI_FitnessKlub.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// dodavanje baze podataka
builder.Services.AddDbContext<FitnessKlubContext>(
    opcije =>
    {
        opcije.UseSqlServer(builder.Configuration.GetConnectionString("FitnessKlubContext"));
    }
    );

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(opcije => {
        opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
        opcije.EnableTryItOutByDefault();
    });
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
// završio za potrebe produkcije

app.Run();
