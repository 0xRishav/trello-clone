import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from '../TaskList/TaskList';
import styles from './Project.module.css';
import nextId from 'react-id-generator';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const Project = ({ project }) => {
  const { projectId } = useParams();
  const { projects } = useSelector((state) => state.project);
  const { title, description } = projects.find(
    (project) => project.id === projectId
  );

  const [workflows, setWorkflows] = useState([
    {
      id: nextId(),
      title: 'To Do',
      tasks: [
        {
          id: nextId(),
          title: 'Task 1',
          description: 'Task 1 description',
        },
        {
          id: nextId(),
          title: 'Task 2',
          description: 'Task 2 description',
        },
        {
          id: nextId(),
          title: 'Task 3',
          description: 'Task 3 description',
        },
        {
          id: nextId(),
          title: 'Task 4',
          description: 'Task 4 description',
        },
      ],
    },
    {
      id: nextId(),
      title: 'In Progress',
      tasks: [
        {
          id: nextId(),
          title: 'Task 5',
          description: 'Task 5 description',
        },
        {
          id: nextId(),

          title: 'Task 6',
          description: 'Task 6 description',
        },
        {
          id: nextId(),
          title: 'Task 7',
          description: 'Task 7 description',
        },
      ],
    },
    {
      id: nextId(),
      title: 'Done',
      tasks: [
        {
          id: nextId(),
          title: 'Task 8',
          description: 'Task 8 description',
        },
        {
          id: nextId(),
          title: 'Task 9',
          description: 'Task 9 description',
        },
        {
          id: nextId(),
          title: 'Task 10',
          description: 'Task 10 description',
        },
      ],
    },
  ]);

  const moveTask = (dragId, sourceListTitle, targetListTitle) => {
    const sourceListIndex = workflows.findIndex(
      (list) => list.title === sourceListTitle
    );
    const targetListIndex = workflows.findIndex(
      (list) => list.title === targetListTitle
    );

    const sourceList = workflows[sourceListIndex];
    const dragIndex = sourceList.tasks.findIndex((task) => task.id === dragId);
    const draggedTask = sourceList.tasks[dragIndex];
    sourceList.tasks.splice(dragIndex, 1);

    const targetList = workflows[targetListIndex];
    targetList.tasks.push(draggedTask);

    setWorkflows([...workflows]);
  };

  return (
    <div className={styles.project}>
      <div className={styles.projectHeader}>
        <img
          src={
            'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          }
          alt={title}
          className={styles.coverImage}
        />
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.workflow}>
          {workflows.map((workflow, index) => (
            <TaskList
              key={index}
              title={workflow.title}
              tasks={workflow.tasks}
              moveTask={moveTask}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default Project;
