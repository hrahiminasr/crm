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
        bool hasDocs = _collection.AsQueryable().Where<Register>(p => p.UserName == userInput.UserName).Any();

        if (hasDocs)
            return BadRequest($"فردی قبلا با شماره {userInput.UserName} ثبت نام کرده است.");

        Register register = new Register(
            Id: null,
            FirstName: userInput.FirstName.Trim(),
            LastName: userInput.LastName.Trim(),
            UserName: userInput.UserName.ToLower().Trim(),
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

    [HttpPost("login")]
    public ActionResult<Register> Login(Login loginIput)
    {
        Register login = _collection.Find<Register>(login =>
                login.UserName == loginIput.UserName.Trim().ToLower()
                && login.Password == loginIput.Password
            ).FirstOrDefault();

        if (login is null)
            return BadRequest("Bad username or password");

        return login;
    }
}