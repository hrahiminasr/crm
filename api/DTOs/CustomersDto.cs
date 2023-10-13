namespace api.DTOs;

public record RegisterCustomersDto(
    [MinLength(3), MaxLength(30)] string Name,
    string? NationallCode,
    string? EconomicCode,
    [MinLength(11), MaxLength(11)] string MobilePhone,
    string? PhoneNumber,
    [MinLength(2), MaxLength(30)] string State,
    [MinLength(2), MaxLength(30)] string City,
    string? Address,
    string? FactoryAddress,
    string? ZipeCode
);
