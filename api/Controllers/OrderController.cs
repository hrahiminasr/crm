namespace api.Controllers;

public class OrderController : BaseApiController
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
        OrderUserDto? orderUserDto = await _orderrepository.CreateAsync(userInput, cancellationToken);

        if (orderUserDto is null)
            return BadRequest("این شماره سفارش قبلا ثبت شده است");

        return orderUserDto; 
    }
}
