using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Validations
{
    public class AgeValidator : ValidationAttribute
    {
        private readonly int _minimumAge;

        public AgeValidator(int minimumAge)
        {
            _minimumAge = minimumAge;
            ErrorMessage = $"User must be at least {_minimumAge} years old.";
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime birthDate)
            {
                var age = DateTime.Today.Year - birthDate.Year;

                if (birthDate > DateTime.Today.AddYears(-age))
                {
                    age--;
                }

                if (age >= _minimumAge)
                {
                    return ValidationResult.Success;
                }
                else
                {
                    var errorMessage = string.IsNullOrEmpty(ErrorMessage)
                        ? $"User must be at least {_minimumAge} years old."
                        : ErrorMessage;
                    return new ValidationResult(errorMessage);
                }
            }

            return new ValidationResult("Invalid birth date");
        }
    }
}
