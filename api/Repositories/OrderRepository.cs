namespace api.Repositories;

public class OrderRepository : IOrderRepository
{
    private const string _collectionName = "orders";
    private readonly IMongoCollection<Order> _collection;
    public OrderRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Order>(_collectionName);
    }

    public async Task<OrderUserDto?> CreateAsync(OrderDto userInput, CancellationToken cancellationToken)
    {
        bool hasDocs = await _collection.Find<Order>(p => p.Number == userInput.Number).AnyAsync(cancellationToken);

        if (hasDocs)
            return null;

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

        if (_collection is not null)
            await _collection.InsertOneAsync(order, null, cancellationToken);

        if (order.Id is not null)
        {
            OrderUserDto orderUserDto = new OrderUserDto(
                Id: order.Id,
                CustomerName: order.CustomerName,
                Date: order.Date,
                Number: order.Number,
                Row: order.Row,
                Product: order.Product,
                ProductNumber: order.ProductNumber,
                Unit: order.Unit,
                Description: order.Description
            );

            return orderUserDto;
        }

        return null;
    }
}
