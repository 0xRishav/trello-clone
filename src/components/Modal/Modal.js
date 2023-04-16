import React, { useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ title, onSave, onClose, children }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSave = () => {
    onSave(projectTitle, projectDescription);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>{title}</h2>
          <button className={styles.close_button} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modal_content}>{children}</div>
        <div className={styles.modal_actions}>
          <button className={styles.cancel_button} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save_button} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
