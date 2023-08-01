using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public record Order(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    [MinLength(3), MaxLength(30)] string CustomerName,
    [MinLength(11), MaxLength(11)] string MobilePhone,
    [MinLength(2), MaxLength(30)] string City,
    [MinLength(10), MaxLength(10)] string Date,
    [Range(1, 1000)] int Number,
    // [Range(1, 100)] int Row,
    [MinLength(2), MaxLength(50)] string Product,
    [Range(1, 1000)] int ProductNumber,
    [MinLength(2), MaxLength(20)] string Unit,
    string? Description
);
