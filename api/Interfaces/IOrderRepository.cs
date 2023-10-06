namespace api.Interfaces;

public interface IOrderRepository
{
    public Task<OrderUserDto?> Create(OrderDto userInput, CancellationToken cancellationToken);
}
