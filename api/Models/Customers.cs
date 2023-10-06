namespace api.Models;

public record Customers(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    [MinLength(3), MaxLength(30)] string Name,
    string? NationallCode,
    string? EconomicCode,
    [MinLength(11), MaxLength(11)] string MobilePhone,
    string? PhoneNumber,
    [MinLength(2), MaxLength(30)] string State,
    [MinLength(2), MaxLength(30)] string City,
    string ?Address,
    string? FactoryAddress,
    string? ZipeCode
);


