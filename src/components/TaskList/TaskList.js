import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { useDrop } from 'react-dnd';
import styles from './TaskList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../state/reducers/workflow';
import Modal from '../Modal/Modal';

const TaskList = ({ title, tasks, moveTask, listId }) => {
  const dispatch = useDispatch();
  const { workflows } = useSelector((state) => state.workflow);
  const [taskList, setTaskList] = useState(tasks);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => {
      if (item.listId !== listId) {
        moveTask(item.id, item.listId, listId);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleAddProjectClick = () => {
    setShowCreateTaskModal(true);
  };

  const handleSaveProject = () => {
    dispatch(
      addTask({
        workflowId: listId,
        task: { title: newTaskTitle, description: newTaskDescription },
      })
    );
    setShowCreateTaskModal(false);
  };

  return (
    <div ref={drop} className={styles.taskList}>
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          listId={listId}
        />
      ))}
      <div className={styles.add_task_btn} onClick={handleAddProjectClick}>
        <span className={styles.add_task_icon}>+</span>
        <span className={styles.add_task_text}>Click to add a new task</span>
      </div>
      {showCreateTaskModal && (
        <Modal
          title="Create a new task"
          onSave={handleSaveProject}
          onClose={() => setShowCreateTaskModal(false)}
        >
          <div className={styles.modal_content}>
            <label htmlFor="task_title" className={styles.task_title_label}>
              Title
            </label>
            <input
              id="task_title"
              className={styles.task_title}
              type="text"
              onChange={(e) => {
                setNewTaskTitle(e.target.value);
              }}
            />
            <label
              htmlFor="task_description"
              className={styles.task_description_label}
            >
              Description
            </label>
            <textarea
              className={styles.task_description}
              id="task_description"
              onChange={(e) => {
                setNewTaskDescription(e.target.value);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskList;
