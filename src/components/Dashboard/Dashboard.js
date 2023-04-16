import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../state/reducers/project';
import ProjectCard from '../ProjectCard/ProjectCard';
import Modal from '../Modal/Modal';

const Dashboard = () => {
  const { projects } = useSelector((state) => state.project);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const dispatch = useDispatch();

  const handleAddProjectClick = () => {
    setShowCreateProjectModal(true);
  };

  const handleSaveProject = () => {
    dispatch(
      addProject({ title: projectTitle, description: projectDescription })
    );
    setShowCreateProjectModal(false);
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
      {showCreateProjectModal && (
        <Modal
          title="Create a new project"
          onSave={handleSaveProject}
          onClose={() => setShowCreateProjectModal(false)}
        >
          <div className={styles.modal_content}>
            <label
              htmlFor="project_title"
              className={styles.project_title_label}
            >
              Title
            </label>
            <input
              id="project_title"
              className={styles.project_title}
              type="text"
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
            />
            <label
              htmlFor="project_description"
              className={styles.project_description_label}
            >
              Description
            </label>
            <textarea
              className={styles.project_description}
              id="project_description"
              onChange={(e) => {
                setProjectDescription(e.target.value);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
