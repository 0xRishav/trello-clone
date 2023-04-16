import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import styles from './TaskCard.module.css';
import TaskDetailPopup from '../TaskDetailPopup/TaskDetailPopup';

const TaskCard = ({ task, index, moveTask, listId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id, index, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleCardClick = (e) => {
    setShowPopup(true);
  };

  const handleClosePopup = (e) => {
    e.stopPropagation();
    setShowPopup(false);
  };

  return (
    <div
      ref={drag}
      className={styles.taskCard}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={handleCardClick}
      data-testid="task-card"
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Assigned to: {task.assignedUser || 'Unassigned'}</p>
      {showPopup && <TaskDetailPopup task={task} onClose={handleClosePopup} />}
    </div>
  );
};

export default TaskCard;
