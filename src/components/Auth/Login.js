import React, { useEffect, useRef, useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/Validations';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!email && !password && showError) setShowError(false);
    const { isValidPassword } = validatePassword(password);
    const isEmailValid = validateEmail(email);
    setIsPasswordValid(isValidPassword);
    setIsEmailValid(isEmailValid);
  }, [email, password]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid || !isEmailValid) {
      setShowError(true);
      return;
    }
    console.log('submit');
  };

  return (
    <div className="auth-wrapper">
      <div className="heading-medium">Trello</div>
      <div className="auth-box">
        <div className="text-large">Login to your account</div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="input-feild"
              type="text"
              placeholder="Enter Email"
              onChange={handleEmailChange}
            />
          </label>
          <div style={{ position: 'relative' }}>
            <label>
              <input
                className="input-feild"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
          </div>
          {showError && (
            <div className="error">
              {!isEmailValid &&
                !isPasswordValid &&
                `Email & Password not valid`}
              {!isEmailValid && isPasswordValid && `Email is not valid`}
              {!isPasswordValid && isEmailValid && `Password is not valid`}
            </div>
          )}

          <button className="primary-button">Login</button>
        </form>
        <button className="secondary-button">Not Registered?</button>
      </div>
    </div>
  );
}

export default Login;
