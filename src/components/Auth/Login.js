import React, { useEffect, useRef, useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/Validations';
import useAuth from '../../custom-hooks/useAuth';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../../state/reducers/auth';

function Login() {
  const [email, setEmail] = useState('');
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

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
    if (!isEmailValid && !isPasswordValid) {
      dispatch(setError('Email & Password not valid'));
      return;
    } else if (!isEmailValid) {
      dispatch(setError('Email is not valid'));
      return;
    } else if (!isPasswordValid) {
      dispatch(setError('Password is not valid'));
      return;
    }
    const res = loginUser(email, password);
    if (!res) return;
    navigate('/dashboard');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
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
          {error && <div className="error">{error}</div>}

          <button className="primary-button">Login</button>
        </form>
        <button className="secondary-button" onClick={handleRegisterRedirect}>
          Not Registered?
        </button>
      </div>
    </div>
  );
}

export default Login;
