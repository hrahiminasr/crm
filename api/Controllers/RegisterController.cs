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
    public RegisterController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Register>("registers");
    }

    [HttpPost("register")]
    public ActionResult<Register> create(Register userInput)
    {
        if (userInput.Password != userInput.ConfirmPassword)
        {
            return BadRequest(".کلمه عبور با تکرار کلمه عبور یکسان نیست");
        }
        bool hasDocs = _collection.AsQueryable().Where<Register>(p => p.UserName == userInput.UserName).Any();

        if (hasDocs)
            return BadRequest($"فردی قبلا با شماره {userInput.UserName} ثبت نام کرده است.");

        Register register = new Register(
            Id: null,
            FirstName: userInput.FirstName.Trim(),
            LastName: userInput.LastName.Trim(),
            UserName: userInput.UserName.ToLower().Trim(),
            Password: userInput.Password,
            ConfirmPassword: userInput.ConfirmPassword,
            UserTitle: userInput.UserTitle,
            UserRole: userInput.UserRole,
            Address: userInput.Address,
            PhoneNumber: userInput.PhoneNumber.Trim(),
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

    [HttpGet("get-by-username/{UserName}/{Password}")]
    public ActionResult<Register>? Login(string userName, string password)
    {
        Register login = _collection.Find<Register>(login =>
        login.UserName == userName.Trim().ToLower()
        && login.Password == password).FirstOrDefault();

        if (login is null)
            return BadRequest(".نام کاربری یارمز عبور اشتباه می باشد");

        return login;
    }

    [HttpGet("get-by-userside")]
    public ActionResult<IEnumerable<Register>> LoginAdmin()
    {
        List<Register> loginAdmin = _collection.Find<Register>(loginAdmin => loginAdmin.UserRole == "admin").ToList();

        return loginAdmin;
    }
}