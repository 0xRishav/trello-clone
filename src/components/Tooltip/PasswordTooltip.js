import React from 'react';
import './PasswordTooltip.css';
import { validatePassword } from '../../utils/Validations';

const PasswordTooltip = React.forwardRef(({ password }, ref) => {
  const {
    validationResults: {
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    },
  } = validatePassword(password);

  return (
    <div ref={ref} className="password-tooltip">
      <div className="validation-row">
        <span
          className={`validation-icon ${
            hasUppercase ? 'validation-success' : 'validation-failure'
          }`}
        >
          {hasUppercase ? '✓' : '✕'}
        </span>
        At least one uppercase letter
      </div>
      <div className="validation-row">
        <span
          className={`validation-icon ${
            hasLowercase ? 'validation-success' : 'validation-failure'
          }`}
        >
          {hasLowercase ? '✓' : '✕'}
        </span>
        At least one lowercase letter
      </div>
      <div className="validation-row">
        <span
          className={`validation-icon ${
            hasNumber ? 'validation-success' : 'validation-failure'
          }`}
        >
          {hasNumber ? '✓' : '✕'}
        </span>
        At least one number
      </div>
      <div className="validation-row">
        <span
          className={`validation-icon ${
            hasSpecialChar ? 'validation-success' : 'validation-failure'
          }`}
        >
          {hasSpecialChar ? '✓' : '✕'}
        </span>
        At least one special character
      </div>
      <div className="validation-row">
        <span
          className={`validation-icon ${
            hasMinLength ? 'validation-success' : 'validation-failure'
          }`}
        >
          {hasMinLength ? '✓' : '✕'}
        </span>
        Minimum 8 characters
      </div>
    </div>
  );
});

export default PasswordTooltip;
