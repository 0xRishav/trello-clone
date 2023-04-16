import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <h1 className={styles.welcomeText}>Welcome to Trello</h1>
      <div className={styles.buttonGroup}>
        <Link to="/login" className="primary-button">
          Login
        </Link>
        <Link to="/register" className="secondary-button">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
