using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
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
}
