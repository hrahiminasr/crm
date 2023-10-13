namespace api.DTOs;

public record CustomersUserDto(
    string? Id,
    string Name,
    string MobilePhone,
    string State,
    string City
);
