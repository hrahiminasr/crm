using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IMongoCollection<Order> _collection;
    public OrderController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Order>("orders");
    }

    [HttpPost("add-order")]
    public ActionResult<Order> create(Order userInput)
    {
        bool hasDocs = _collection.AsQueryable().Where<Order>(p => p.Number == userInput.Number).Any();

        if (hasDocs)
            return BadRequest("این شماره سفارش قبلا ثبت شده است");

        Order order = new Order(
            Id: null,
            CustomerName: userInput.CustomerName.ToLower().Trim(),
            MobilePhone: userInput.MobilePhone.Trim(),
            City: userInput.City.Trim().ToLower(),
            Date: userInput.Date.Trim(),
            Number: userInput.Number,
            Row: userInput.Row,
            Product: userInput.Product.ToLower().Trim(),
            ProductNumber: userInput.ProductNumber,
            Unit: userInput.Unit.ToLower().Trim(),
            Description: userInput.Description?.Trim()
        );

        _collection.InsertOne(order);

        return order;
    }
}
