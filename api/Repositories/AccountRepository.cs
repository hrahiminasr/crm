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

    public async Task<LoginUserDto?> Login(LoginDto userName, CancellationToken cancellationToken)
    {
        Register register = await _collection.Find<Register>(login =>
        login.UserName == userName.UserName.Trim().ToLower()
        && login.Password == userName.Password).FirstOrDefaultAsync(cancellationToken);

        if (register is null)
            return null;

        if (register.Id is not null)
        {
            LoginUserDto loginUserDto = new LoginUserDto(
                Id: register.Id,
                UserName: register.UserName
            );

            return loginUserDto;
        }

        return null;
    }

    public async Task<GetUserDto?> GetByUserName(string userInput, CancellationToken cancellationToken)
    {
        Register user = await _collection.Find(user => user.UserName == userInput.ToLower().Trim()).FirstOrDefaultAsync(cancellationToken);

        if (user is null)
            return null;

        if (user.Id is not null)
        {
            GetUserDto getUserDto = new GetUserDto(
                Id: user.Id,
                FirstName: user.FirstName,
                LastName: user.LastName,
                UserTitle: user.UserTitle,
                UserRole: user.UserRole,
                PhoneNumber: user.PhoneNumber,
                Email: user.Email
            );

            return getUserDto;
        }

        return null;
    }
}
