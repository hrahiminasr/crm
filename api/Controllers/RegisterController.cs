using api.DTOs;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    /// <summary>
    /// repository
    /// </summary>
    #region Token Settings
    private readonly IAccountRepository _accountRepository;

    // constructor - dependency injection
    public RegisterController(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;

        // _tokenService = tokenService;
    }
    #endregion

    /// <summary>
    /// create account
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Create(RegistertDto userInput, CancellationToken cancellationToken)
    {
        if (userInput.Password != userInput.ConfirmPassword)
        {
            return BadRequest(".کلمه عبور با تکرار کلمه عبور یکسان نیست");
        }

        UserDto? userDto = await _accountRepository.Create(userInput, cancellationToken);

        if(userDto is null)
            return BadRequest($"این نام کاربری قبلا ثبت شده است");

        return userDto;
    }

    /// <summary>
    /// show get all account
    /// </summary>
    /// <returns></returns>
    // [HttpGet("get-all")]
    // public ActionResult<IEnumerable<Register>> GetAll()
    // {
    //     List<Register> registers = _collection.Find<Register>(new BsonDocument()).ToList();

    //     if (!registers.Any())
    //         return NoContent();

    //     return registers;
    // }

    /// <summary>
    /// login user
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <returns></returns>
    // [HttpGet("get-by-username/{UserName}/{Password}")]
    // public ActionResult<Register> Login(string userName, string password)
    // {
    //     Register login = _collection.Find<Register>(login =>
    //     login.UserName == userName.Trim().ToLower()
    //     && login.Password == password).FirstOrDefault();

    //     if (login is null)
    //         return Unauthorized(".نام کاربری یا رمز عبور اشتباه می باشد");

    //     return login;
    // }

    // [HttpGet("get-by-userside")]
    // public ActionResult<IEnumerable<Register>> LoginAdmin()
    // {
    //     List<Register> loginAdmin = _collection.Find<Register>(loginAdmin => loginAdmin.UserRole == "admin").ToList();

    //     return loginAdmin;
    // }
}