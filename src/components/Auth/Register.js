import React, { useEffect, useState, useRef } from 'react';
import './Auth.css';
import PasswordTooltip from '../Tooltip/PasswordTooltip';
import { validatePassword, validateEmail } from '../../utils/Validations';
import useAuth from '../../custom-hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Register() {
  const { error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const tooltipRef = useRef(null);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (tooltipRef.current && password.length > 0) {
      tooltipRef.current.style.display = 'block';
      tooltipRef.current.style.position = 'absolute';
      tooltipRef.current.style.top = '-50%';
      tooltipRef.current.style.left = `calc(100% - 2rem)`;
    } else if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }
  }, [password]);

  useEffect(() => {
    if (!email && !password && showValidationError)
      setShowValidationError(false);
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
      setShowValidationError(true);
      return;
    }
    const res = registerUser(email, password);
    if (!res) return;
    navigate('/');
  };

  return (
    <div className="auth-wrapper">
      <div className="heading-medium">Trello</div>
      <div className="auth-box">
        <div className="text-large">Sign up for your account</div>
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
            {!isPasswordValid && (
              <PasswordTooltip ref={tooltipRef} password={password} />
            )}
          </div>
          {showValidationError && (
            <div className="error">
              {!isEmailValid &&
                !isPasswordValid &&
                `Email & Password not valid`}
              {!isEmailValid && isPasswordValid && `Email is not valid`}
              {!isPasswordValid && isEmailValid && `Password is not valid`}
            </div>
          )}
          {error && <div className="error">{error}</div>}

          <button className="primary-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
