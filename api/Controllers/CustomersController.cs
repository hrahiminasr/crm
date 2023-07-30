using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly IMongoCollection<Customers> _collection;
    public CustomersController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Customers>("customers");
    }

    [HttpPost("customers")]
    public ActionResult<Customers> create(Customers cusInput)
    {
        bool hasDocs = _collection.AsQueryable().Where<Customers>(p => p.MobilePhone.Trim() == cusInput.MobilePhone.Trim()).Any();

        if (hasDocs)
        return BadRequest(". این مشتری قبلا ثبت شده است");

        Customers customers = new Customers(
            Id: null,
            Name: cusInput.Name.Trim().ToLower(),
            NationallCode: cusInput.NationallCode?.Trim(),
            EconomicCode:cusInput.EconomicCode?.Trim(),
            MobilePhone: cusInput.MobilePhone.Trim(),
            PhoneNumber: cusInput.PhoneNumber?.Trim(),
            State: cusInput.State.Trim().ToLower(),
            City: cusInput.City.Trim().ToLower(),
            Address: cusInput.Address?.Trim(),
            FactoryAddress: cusInput.FactoryAddress?.Trim(),
            ZipeCode: cusInput.ZipeCode?.Trim()
        );

        _collection.InsertOne(customers);

        return customers;
    }

        [HttpGet("get-all")]
    public ActionResult<IEnumerable<Customers>> GetAll()
    {
        List<Customers> customers = _collection.Find<Customers>(new BsonDocument()).ToList();

        if (!customers.Any())
            return NoContent();

        return customers;
    }

    [HttpDelete("delete/{userMobilePhone}")]
    public ActionResult<DeleteResult> Delete(string userMobilePhone)
    {

        return _collection.DeleteOne<Customers>(doc => doc.MobilePhone == userMobilePhone);
    }
}
