namespace api.Extensions;

public static class RepositoryServiceExtensions
{
    public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
    {
        #region Dependecy Injection
        services.AddScoped<IAccountRepository, AccountRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<ICustomersRepository, CustomersRepository>();
        services.AddScoped<ITokenService, TokenService>();
        #endregion Dependecy Injection

        return services;
    }
}
