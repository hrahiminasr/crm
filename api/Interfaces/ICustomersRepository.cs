namespace api.Interfaces;

public interface ICustomersRepository
{
    public Task<CustomersUserDto?> Create(RegisterCustomersDto cusInput, CancellationToken cancellationToken);

    public Task<IEnumerable<Customers>> GetAll();

     public Task<DeleteResult> Delete(string userMobilePhone);

     public Task<UpdateResult> UpdateUserById(string userId, Customers userIn, CancellationToken cancellationToken);
}
