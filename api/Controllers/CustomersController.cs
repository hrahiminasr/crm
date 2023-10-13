using Microsoft.OpenApi.Any;
using MongoDB.Bson.Serialization.Serializers;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
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
        CustomersUserDto? customersUserDto = await _customersRepository.Create(cusInput, cancellationToken);

        if (customersUserDto is null)
            return BadRequest(". این مشتری قبلا ثبت شده است");

        return customersUserDto;
    }

    // [HttpGet("get-all")]
    // public async Task<ActionResult<IEnumerable<Customers>>> GetAll()
    // {
    //     List<Customers>? customers = await _customersRepository.GetAll(IEnumerable<>);

    //     if (customers is null)
    //         return NoContent();

    //     return customers;
    // }

    /// <summary>
    /// delet customer
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userMobilePhone"></param>
    /// <returns></returns>
    [HttpDelete("delete/{userMobilePhone}")]
    public async Task<ActionResult<DeleteResult>> Delete(string userMobilePhone)
    {
        DeleteResult? deleteResult = await _customersRepository.Delete(userMobilePhone);

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
        UpdateResult? updateResult = await _customersRepository.UpdateUserById(userId, userIn, cancellationToken);

        return updateResult;
    }
}
