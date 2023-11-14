namespace api.Interfaces;

public interface ICustomersRepository
{
    public Task<CustomersUserDto?> CreateAsync(RegisterCustomersDto cusInput, CancellationToken cancellationToken);

    public Task<List<CustomersUserDto>> GetAllAsync(CancellationToken cancellationToken);

     public Task<DeleteResult> DeleteAsync(string userMobilePhone);

     public Task<UpdateResult> UpdateUserByIdAsync(string userId, Customers userIn, CancellationToken cancellationToken);
}
