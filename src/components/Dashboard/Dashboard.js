import React from 'react';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../state/reducers/project';
import ProjectCard from '../ProjectCard/ProjectCard';

const Dashboard = () => {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const handleAddProjectClick = () => {
    console.log('Add project button clicked');
    dispatch(addProject());
  };

  return (
    <div className={styles.dashboard}>
      {projects.map((project) => (
        <ProjectCard {...project} />
      ))}
      <div className={styles.add_project_btn} onClick={handleAddProjectClick}>
        <span className={styles.add_project_icon}>+</span>
        <span className={styles.add_project_text}>
          Click to add a new project
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
