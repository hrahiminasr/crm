using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

[Authorize]
public class RegisterController(IAccountRepository _accountRepository) : BaseApiController
{
    /// <summary>
    /// create account
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("register")]
    public async Task<ActionResult<LoginUserDto>> Create(RegistertDto userInput, CancellationToken cancellationToken)
    {
        if (userInput.Password != userInput.ConfirmPassword)
        {
            return BadRequest(".کلمه عبور با تکرار کلمه عبور یکسان نیست");
        }

        LoginUserDto? loginUserDto = await _accountRepository.CreateAsync(userInput, cancellationToken);

        if (loginUserDto is null)
            return BadRequest($"این نام کاربری قبلا ثبت شده است");

        return loginUserDto;
    }

    /// <summary>
    /// show get all account
    /// </summary>
    /// <returns></returns>
    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<GetUserDto>>> GetAll(CancellationToken cancellationToken)
    {
        List<GetUserDto> getUserDtos = await _accountRepository.GetAllAsync(cancellationToken);

        if (!getUserDtos.Any())
            return NoContent();

        return getUserDtos;
    }

    /// <summary>
    /// login user
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<ActionResult<LoginUserDto>> Login(LoginDto userName, CancellationToken cancellationToken)
    {
        LoginUserDto? loginUserDto = await _accountRepository.LoginAsync(userName, cancellationToken);

        if (loginUserDto is null)
            return Unauthorized(".نام کاربری یا رمز عبور اشتباه می باشد");

        return loginUserDto;
    }

    /// <summary>
    /// get user by userName
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("get-by-userName/{userInput}")]
    public async Task<ActionResult<GetUserDto?>> GetByUserName(string userInput, CancellationToken cancellationToken)
    {
        GetUserDto? getUserDto = await _accountRepository.GetByUserNameAsync(userInput, cancellationToken);

        if (getUserDto is null)
            return NotFound("این نام کاربری وجود ندارد");

        return getUserDto;
    }
}