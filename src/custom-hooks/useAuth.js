import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from './useLocalStorage';
import { login, logout, register, setError } from '../state/reducers/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const { userData, isAuthenticated, TRELLO_USERS } = useSelector(
    (state) => state.auth
  );
  const [localTrelloUsers, setLocalTrelloUsers] = useLocalStorage(
    'localTrelloUsers',
    TRELLO_USERS || []
  );
  const [localIsAuthenticated, setLocalIsAuthenticated] = useLocalStorage(
    'localIsAuthenticated',
    isAuthenticated || false
  );
  const [localUserData, setLocalUserData] = useLocalStorage(
    'localUserData',
    userData || null
  );

  const registerUser = (email, password) => {
    if (localTrelloUsers.some((user) => user.email === email)) {
      dispatch(setError('User already exists'));
      return false;
    }

    try {
      dispatch(register({ email, password }));
      setLocalTrelloUsers([...localTrelloUsers, { email, password }]);
      setLocalUserData({ email, password });
      setLocalIsAuthenticated(true);
      dispatch(setError(null));
      return true;
    } catch (error) {
      dispatch(setError('User already exists'));
      return false;
    }
  };

  const loginUser = (email, password) => {
    const user = localTrelloUsers.find((user) => user.email === email);
    if (user) {
      if (user.password === password) {
        dispatch(login({ email, password }));
        setLocalIsAuthenticated(true);
        setLocalUserData({ email, password });
        dispatch(setError(null));
        return true;
      } else {
        dispatch(setError('Password is incorrect, please try again'));
        return false;
      }
    } else {
      dispatch(setError('User not found, please sign up'));
      return false;
    }
  };

  const logoutUser = () => {
    try {
      dispatch(logout());
      setLocalIsAuthenticated(false);
      setLocalUserData(null);
      dispatch(setError(null));
      return true;
    } catch (error) {
      dispatch(setError('Something went wrong, please try again'));
      return false;
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
  };
};

export default useAuth;
