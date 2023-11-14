namespace api.Interfaces;

public interface IOrderRepository
{
    public Task<OrderUserDto?> CreateAsync(OrderDto userInput, CancellationToken cancellationToken);
}
