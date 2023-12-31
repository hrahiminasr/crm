namespace api.Models;

public record Order(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string CustomerName,
    string MobilePhone,
    string City,
    string Date,
    int Number,
    int Row,
    string Product,
    int ProductNumber,
    string Unit,
    string? Description
);
