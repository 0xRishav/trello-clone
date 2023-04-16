import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from '../TaskList/TaskList';
import styles from './Project.module.css';
import nextId from 'react-id-generator';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkFlow } from '../../state/reducers/workflow';
import { cloneDeep } from 'lodash';

const Project = ({ project }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const { workflows } = useSelector((state) => state.workflow);
  const { title, description } = projects.find(
    (project) => project.id === parseInt(projectId)
  );

  const moveTask = (dragId, sourceListId, targetListId) => {
    const workflowsCopy = cloneDeep(workflows);
    const sourceListIndex = workflowsCopy.findIndex(
      (list) => list.id === parseInt(sourceListId)
    );
    const targetListIndex = workflowsCopy.findIndex(
      (list) => list.id === parseInt(targetListId)
    );
    if (sourceListIndex === -1 || targetListIndex === -1) return;
    const sourceList = workflowsCopy[sourceListIndex];
    const dragIndex = sourceList.tasks.findIndex((task) => task.id === dragId);
    if (dragIndex === -1) return;
    const draggedTask = sourceList.tasks[dragIndex];
    sourceList.tasks.splice(dragIndex, 1);
    const targetList = workflowsCopy[targetListIndex];
    targetList.tasks.push(draggedTask);
    dispatch(setWorkFlow({ workflows: workflowsCopy }));
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
              listId={workflow.id}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default Project;
