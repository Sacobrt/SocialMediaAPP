using System.ComponentModel.DataAnnotations;

namespace CSHARP_SocialMediaAPP.Validations
{
    /// <summary>
    /// Custom validation attribute to ensure a user's age is at least a specified minimum.
    /// </summary>
    public class AgeValidator : ValidationAttribute
    {
        private readonly int _minimumAge;

        /// <summary>
        /// Initializes a new instance of the AgeValidator class with a specified minimum age.
        /// </summary>
        /// <param name="minimumAge">The minimum age required for validation.</param>
        public AgeValidator(int minimumAge)
        {
            _minimumAge = minimumAge;
            ErrorMessage = $"User must be at least {_minimumAge} years old.";
        }

        /// <summary>
        /// Validates the provided value to check if the user's age meets the minimum age requirement.
        /// </summary>
        /// <param name="value">The value being validated, expected to be a DateTime representing the user's birth date.</param>
        /// <param name="validationContext">The context within which the validation is executed.</param>
        /// <returns>A ValidationResult indicating success or failure of the validation.</returns>
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime birthDate)
            {
                // Calculate the user's age based on the current date
                var age = DateTime.Today.Year - birthDate.Year;

                // Adjust age if the birthday has not occurred yet this year
                if (birthDate > DateTime.Today.AddYears(-age))
                {
                    age--;
                }

                // Check if the user's age meets the minimum age requirement
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
