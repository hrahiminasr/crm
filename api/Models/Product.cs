using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public record Product(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    
    [MinLength(3), MaxLength(30)]string Name,
    [MinLength(3),MaxLength(30)]string Unit,
    double? Price
);
