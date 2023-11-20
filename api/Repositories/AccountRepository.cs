using System.Text;

namespace api.Repositories;

public class AccountRepository : IAccountRepository
{
    private const string _collectionName = "registers";
    private readonly IMongoCollection<Register> _collection;
    private readonly ITokenService _tokenServices;
    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings,ITokenService tokenService)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Register>(_collectionName);
        _tokenServices = tokenService;
    }

    public async Task<LoginUserDto?> CreateAsync(RegistertDto userInput, CancellationToken cancellationToken)
    {
        bool hasDocs = await _collection.Find<Register>(p =>
        p.UserName == userInput.UserName).AnyAsync(cancellationToken);

        if (hasDocs)
            return null;

        using var hmac = new HMACSHA512();

        Register register = new Register(
            Id: null,
            FirstName: userInput.FirstName.Trim().ToLower(),
            LastName: userInput.LastName.Trim().ToLower(),
            UserName: userInput.UserName.ToLower().Trim(),
            PasswordHash: hmac.ComputeHash(Encoding.UTF8.GetBytes(userInput.Password)),
            PasswordSalt: hmac.Key,
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
            LoginUserDto loginUserDto = new LoginUserDto(
                Id: register.Id,
                Token: _tokenServices.CreateToken(register),
                UserName:register.UserName
                
            );

            return loginUserDto;
        }

        return null;
    }

    public async Task<LoginUserDto?> LoginAsync(LoginDto userName, CancellationToken cancellationToken)
    {
        Register register = await _collection.Find<Register>(login =>
        login.UserName == userName.UserName.Trim().ToLower()).FirstOrDefaultAsync(cancellationToken);

        if (register is null)
            return null;

        using var hmac = new HMACSHA512(register.PasswordSalt!);

        var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userName.Password));

        if (register.PasswordHash is not null && register.PasswordHash.SequenceEqual(ComputedHash))
        {
            if (register.Id is not null)
            {
                LoginUserDto loginUserDto = new LoginUserDto(
                    Id: register.Id,
                    UserName: register.UserName,
                    Token: _tokenServices.CreateToken(register)
                );

                return loginUserDto;
            }
        }

        return null;
    }

    public async Task<GetUserDto?> GetByUserNameAsync(string userInput, CancellationToken cancellationToken)
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

    public async Task<List<GetUserDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        List<Register> registers = await _collection.Find<Register>(new BsonDocument()).ToListAsync(cancellationToken);

        List<GetUserDto> getUserDtos = new List<GetUserDto>();

        if (registers.Any())
        {
            foreach (Register register in registers)
            {
                GetUserDto getUserDto = new GetUserDto(
                    Id: register.Id!,
                    FirstName: register.FirstName,
                    LastName: register.LastName,
                    UserTitle: register.UserTitle,
                    UserRole: register.UserRole,
                    PhoneNumber: register.PhoneNumber,
                    Email: register.Email
                );

                getUserDtos.Add(getUserDto);
            }

            return getUserDtos;
        }

        return getUserDtos;
    }
}
