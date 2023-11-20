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

public record LoginUserDto(
    string Id,
    string UserName,
    string Token
);

public record GetUserDto(
    string Id,
    string FirstName,
    string LastName,
    string UserTitle,
    string UserRole,
    string PhoneNumber,
    string? Email
);
