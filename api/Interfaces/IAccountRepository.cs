namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<LoginUserDto?> CreateAsync(RegistertDto userInput, CancellationToken cancellationToken);

    public Task<LoginUserDto> LoginAsync(LoginDto userName, CancellationToken cancellationToken);

    public Task<GetUserDto?> GetByUserNameAsync(string userInput, CancellationToken cancellationToken);

    public  Task<List<GetUserDto>> GetAllAsync(CancellationToken cancellationToken);
}
