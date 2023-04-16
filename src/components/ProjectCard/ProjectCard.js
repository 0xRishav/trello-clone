import React from 'react';
import styles from './ProjectCard.module.css';
import { useNavigate } from 'react-router';

function ProjectCard({ id, title, description }) {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className={styles.project_card}
      onClick={() => navigate(`/project/${id}`)}
    >
      <div className={styles.project_title}>{title}</div>
      <div className={styles.project_description}>{description}</div>
    </div>
  );
}

export default ProjectCard;
