using System.ComponentModel.DataAnnotations;

namespace api.Models;

public record Login(
    [MinLength(5), MaxLength(15)] string UserName,
    [MinLength(8)] string Password
);
