namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{   
    #region Token Setting
        private readonly IOrderRepository _orderrepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderrepository = orderRepository;
        }
    #endregion Token Setting

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
        OrderUserDto? orderUserDto = await _orderrepository.Create(userInput, cancellationToken);

        if (orderUserDto is null)
            return BadRequest("این شماره سفارش قبلا ثبت شده است");

        return orderUserDto; 
    }
}
