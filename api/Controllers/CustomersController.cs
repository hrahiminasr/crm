namespace api.Controllers;

public class CustomersController : BaseApiController
{
    private readonly ICustomersRepository _customersRepository;

    public CustomersController(ICustomersRepository customersRepository)
    {
        _customersRepository = customersRepository;
    }

    /// <summary>
    /// create customers
    /// Concurrency => async is used
    /// </summary>
    /// <param name="cusInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("customers")]
    public async Task<ActionResult<CustomersUserDto?>> Create(RegisterCustomersDto cusInput, CancellationToken cancellationToken)
    {
        CustomersUserDto? customersUserDto = await _customersRepository.CreateAsync(cusInput, cancellationToken);

        if (customersUserDto is null)
            return BadRequest(". این مشتری قبلا ثبت شده است");

        return customersUserDto;
    }

    /// <summary>
    /// get all
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<CustomersUserDto>>> GetAll(CancellationToken cancellationToken)
    {
        List<CustomersUserDto> customersUserDtos = await _customersRepository.GetAllAsync(cancellationToken);

        if (!customersUserDtos.Any())
            return NoContent();

        return customersUserDtos;
    }

    /// <summary>
    /// delet customer
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userMobilePhone"></param>
    /// <returns></returns>
    [HttpDelete("delete/{userMobilePhone}")]
    public async Task<ActionResult<DeleteResult>> Delete(string userMobilePhone)
    {
        DeleteResult? deleteResult = await _customersRepository.DeleteAsync(userMobilePhone);

        return deleteResult;
    }

    /// <summary>
    /// update customer
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="userIn"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPut("update/{userId}")]
    public async Task<ActionResult<UpdateResult>> UpdateUserById(string userId, Customers userIn, CancellationToken cancellationToken)
    {
        UpdateResult? updateResult = await _customersRepository.UpdateUserByIdAsync(userId, userIn, cancellationToken);

        return updateResult;
    }
}
