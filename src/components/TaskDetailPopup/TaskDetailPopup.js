import React, { useEffect } from 'react';
import styles from './TaskDetailPopup.module.css';

const TaskDetailPopup = ({ task, onClose }) => {
  const { title, description, assignedUser } = task;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains(styles.overlay)) {
        onClose();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Due Date: {task.dueDate || 'No due date'}</p>
        <p>Assigned to: {assignedUser || 'Unassigned'}</p>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPopup;
