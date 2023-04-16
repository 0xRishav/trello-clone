import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { useDrop } from 'react-dnd';
import styles from './TaskList.module.css';

const TaskList = ({ title, tasks, moveTask }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => {
      if (item.listId !== title) {
        moveTask(item.id, item.listId, title);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={styles.taskList}>
      <h2>{title}</h2>
      {taskList.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          listId={title}
        />
      ))}
    </div>
  );
};

export default TaskList;
