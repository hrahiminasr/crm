using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly IMongoCollection<Register> _collection;
    // Dependency Injection
    public RegisterController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Register>("registers");
    }

    [HttpPost("register")]
    public ActionResult<Register> create(Register userInput)
    {
        bool hasDocs = _collection.AsQueryable().Where<Register>(p => p.PhoneNumber == userInput.PhoneNumber).Any();

        if (hasDocs)
            return BadRequest($"فردی قبلا با شماره {userInput.PhoneNumber} ثبت نام کرده است.");

        Register register = new Register(
            Id: null,
            FirstName: userInput.FirstName.Trim(),
            LastName: userInput.LastName.Trim(),
            UserName: userInput.UserName.Trim(),
            Password: userInput.Password,
            PhoneNumber: userInput.PhoneNumber.Trim(),
            userSide: userInput.userSide.Trim(),
            Email: userInput.Email?.Trim().ToLower()
        );

        _collection.InsertOne(register);

        return register;
    }

    [HttpGet("get-all")]
    public ActionResult<IEnumerable<Register>> GetAll()
    {
        List<Register> registers = _collection.Find<Register>(new BsonDocument()).ToList();

        if (!registers.Any())
            return NoContent();

        return registers;
    }
}
