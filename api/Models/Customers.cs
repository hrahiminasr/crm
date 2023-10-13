namespace api.Models;

public record Customers(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string Name,
    string? NationallCode,
    string? EconomicCode,
    string MobilePhone,
    string? PhoneNumber,
    string State,
    string City,
    string? Address,
    string? FactoryAddress,
    string? ZipeCode
);


