namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<UserDto?> Create(RegistertDto userInput, CancellationToken cancellationToken);
}
