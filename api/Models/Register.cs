namespace api.Models;

public record Register(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string FirstName,
    string LastName,
    string UserName,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string UserTitle,
    string UserRole,
    string Address,
    string PhoneNumber,
    string? Email
);
