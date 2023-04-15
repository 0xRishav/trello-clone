function validatePassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;
  const hasNumberAndSpecial = hasNumber && hasSpecialChar;

  const validationResults = {
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    hasMinLength,
    hasNumberAndSpecial,
  };

  const isValidPassword =
    hasUppercase && hasLowercase && hasNumberAndSpecial && hasMinLength;

  return { isValidPassword, validationResults };
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export { validatePassword, validateEmail };
