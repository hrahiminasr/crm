namespace api.DTOs;

public record RegistertDto(
    [MinLength(3), MaxLength(30)] string FirstName,
    [MinLength(3), MaxLength(30)] string LastName,
    [MinLength(5), MaxLength(15)] string UserName,
    [MinLength(8)] string Password,
    string ConfirmPassword,
    string UserTitle,
    string UserRole,
    string Address,
    [MinLength(11), MaxLength(11)] string PhoneNumber,
    [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string? Email
);

public record LoginDto(
    string UserName,
    string Password
);
