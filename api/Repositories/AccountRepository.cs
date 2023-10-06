namespace api.Repositories;

public class AccountRepository : IAccountRepository
{
    private const string _collectionName = "registers";
    private readonly IMongoCollection<Register> _collection;
    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Register>(_collectionName);
    }

    public async Task<UserDto?> Create(RegistertDto userInput, CancellationToken cancellationToken)
    {
        bool hasDocs = await _collection.Find<Register>(p =>
        p.UserName == userInput.UserName).AnyAsync(cancellationToken);

        if (hasDocs)
            return null;

        Register register = new Register(
            Id: null,
            FirstName: userInput.FirstName.Trim().ToLower(),
            LastName: userInput.LastName.Trim().ToLower(),
            UserName: userInput.UserName.ToLower().Trim(),
            Password: userInput.Password,
            ConfirmPassword: userInput.ConfirmPassword,
            UserTitle: userInput.UserTitle,
            UserRole: userInput.UserRole,
            Address: userInput.Address,
            PhoneNumber: userInput.PhoneNumber.Trim(),
            Email: userInput.Email?.Trim().ToLower()
        );

        if (_collection is not null)
            await _collection.InsertOneAsync(register, null, cancellationToken);

        if (register.Id is not null)
        {
            UserDto userDto = new UserDto(
                ID: register.Id,
                FirstName: register.FirstName,
                LastName: register.LastName,
                UserName: register.UserName,
                UserTitle: register.UserTitle,
                UserRole: register.UserRole,
                Address: register.Address,
                PhoneNumber: register.PhoneNumber,
                Email: register.Email
            );

            return userDto;
        }
        
        return null;
    }
}
