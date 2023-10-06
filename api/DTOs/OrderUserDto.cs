namespace api.DTOs;

public record OrderUserDto(
    string Id,
    string CustomerName,
    string Date,
    int Number,
    int Row,
    string Product,
    int ProductNumber,
    string Unit,
    string? Description
);
