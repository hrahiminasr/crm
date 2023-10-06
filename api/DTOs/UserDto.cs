namespace api.DTOs;

public record UserDto(
    string ID,
    string FirstName,
    string LastName,
    string UserName,
    string UserTitle,
    string UserRole,
    string Address,
    string PhoneNumber,
    string? Email
);
