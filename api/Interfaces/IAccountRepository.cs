namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<UserDto?> Create(RegistertDto userInput, CancellationToken cancellationToken);

    public Task<LoginUserDto> Login(LoginDto userName, CancellationToken cancellationToken);

    public Task<GetUserDto?> GetByUserName(string userInput, CancellationToken cancellationToken);

    public  Task<List<GetUserDto>> GetAllAsync(CancellationToken cancellationToken);
}
