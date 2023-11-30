using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

// [Authorize]
public class OrderController(IOrderRepository _orderrepository) : BaseApiController
{   
    /// <summary>
    /// Insert Order
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("add-order")]
    public async Task<ActionResult<OrderUserDto>> Create(OrderDto userInput, CancellationToken cancellationToken)
    {
        OrderUserDto? orderUserDto = await _orderrepository.CreateAsync(userInput, cancellationToken);

        if (orderUserDto is null)
            return BadRequest("این شماره سفارش قبلا ثبت شده است");

        return orderUserDto; 
    }
}
