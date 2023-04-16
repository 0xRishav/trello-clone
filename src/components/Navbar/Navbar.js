import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import useAuth from '../../custom-hooks/useAuth';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const handleAuthClick = () => {
    isAuthenticated ? logoutUser() : navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <a href="/" className={styles.logo}>
          Trello
        </a>
        <button className={styles.loginLogoutButton} onClick={handleAuthClick}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
